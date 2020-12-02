from flask import Flask, request
import flask
import requests
import json
import sys

sys.path.insert(0,'.')
sys.path.insert(0,'..')
from user import User
from group import Group
from report import Report
from stats import Stats
from configparser import ConfigParser
from database.database_handler import DatabaseHandler

# Instantiate Flask app and read from config file on disk to set up the app
care_app = Flask('care_api')
config_path = 'config/config.ini'
config = ConfigParser()
config.read(config_path)
care_app.secret_key = config['app']['secret_key']

# Handles routing for API calls related to user actions
@care_app.route('/account/<path:action>', methods=['GET', 'POST', 'DELETE'])
def update_account(action):
    current_user = User(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(current_user.determine_action(action))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Handles routing for API calls related to CRUD operations related to groups
@care_app.route('/group/<int:group_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def change_groups(group_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if request.method == 'POST':
        response = flask.jsonify(group.add_group(group_id))
    if request.method == 'PUT':
        response = flask.jsonify(group.update_response(group_id))
    if request.method == 'GET':
        response = flask.jsonify(group.view_response(group_id))
    if request.method == 'DELETE':
        response = flask.jsonify(group.delete_response(group_id))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Handles routing for API call to return all groups in the database
@care_app.route('/group/all', methods=['GET'])
def view_groups():
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(group.view_all_groups())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# Handles routing for API call to add a recommendation
@care_app.route('/group/recommend/<int:recommend_id>', methods=['POST'])
def add_recommendation(recommend_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(group.recommend_group(recommend_id))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Handles routing for API call to approve a recommendation
@care_app.route('/group/recommend-approve/<int:recommend_id>', methods=['POST'])
def approve_recommendation(recommend_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response =  group.recommendation_action(recommend_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Handles routing for API call to add a report
@care_app.route('/report', methods=['POST'])
def add_report():
    report = Report(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(report.add_report())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Handles routing for API calls related to CRUD operations related to reports
@care_app.route('/report/<int:report_id>', methods=['GET', 'PUT', 'DELETE'])
def update_reports(report_id):
    report = Report(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if request.method == 'PUT':
        response =  report.update_report_contents(report_id)
    if request.method == 'GET':
        response =  report.view_report(report_id)
    if request.method == 'DELETE':
        response =  report.delete_report(report_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Handles routing for finding the newest reports to display on the homepage
@care_app.route('/report/recent/<int:num_reports>')
def find_newest_reports(num_reports):
    stats = Stats(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(stats.most_recent_reports(num_reports))
    return response

# Handles routing for displaying reports based on associated group
@care_app.route('/report/<path:view_criteria>', methods=['GET'])
def view_reports_by_criteria(view_criteria):
    stats = Stats(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if view_criteria == 'all':
        response = flask.jsonify(stats.get_all_reports())
    else:
        response = flask.jsonify(stats.get_reports_by_group(view_criteria))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Implements spam detection for the contents of a report within the database
@care_app.route('/report/spam/<int:report_id>', methods=['POST'])
def is_report_spam(report_id):
    report = Report(DatabaseHandler(config_path, config['mongodb']['db_name']))
    report_doc = report.view_report(report_id)
    api_url = "https://plino.herokuapp.com/api/v1/classify/"
    payload = \
    {
        'email_text': report_doc.get('content')
    }
    headers = {'content-type': 'application/json'}
    # query spam detection API
    response = requests.post(api_url, data=json.dumps(payload), headers=headers)
    responses= response.json()
    if responses['email_class'] == 'spam':
        return True
    else:
        return False

@care_app.route('/faq/<int:question_id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def update_faq(question_id):
    pass

@care_app.route('/faq/request/<int:request_id>', methods=['GET', 'POST', 'DELETE'])
def manage_faq_request(request_id):
    pass
