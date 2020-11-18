from flask import Flask, request
import flask
import requests
import json
import pprint
from user import User
from group import Group
from report import Report
from stats import Stats
from configparser import ConfigParser
from database.database_handler import DatabaseHandler

# Instantiate Flask app
care_app = Flask('care_api')
config_path = 'config/config.ini'
config = ConfigParser()
config.read(config_path)
print(config.sections())
care_app.secret_key = config['app']['secret_key']

@care_app.route('/account/<path:action>', methods=['GET', 'POST', 'DELETE'])
def update_account(action):
    current_user = User(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(current_user.determine_action(action))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@care_app.route('/group/<int:group_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def change_groups(group_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if request.method == 'POST':
        response = flask.jsonify(group.add_response(group_id))
    if request.method == 'PUT':
        response = flask.jsonify(group.update_response(group_id))
    if request.method == 'GET':
        response = flask.jsonify(group.view_response(group_id))
    if request.method == 'DELETE':
        response = flask.jsonify(group.delete_response(group_id))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@care_app.route('/group/recommend/<int:recommend_id>', methods=['POST'])
def add_recommendation(recommend_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = flask.jsonify(group.recommend_group(recommend_id))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@care_app.route('/group/recommend-approve/<int:recommend_id>', methods=['POST'])
def approve_recommendation(recommend_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response =  group.recommendation_action(recommend_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@care_app.route('/report', methods=['POST'])
def add_report():
    report = Report(DatabaseHandler(config_path, config['mongodb']['db_name']))
    response = report.add_report()
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

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

@care_app.route('/report/<path:view_criteria>', methods=['GET'])
def view_reports_by_criteria(view_criteria):
    stats = Stats(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if view_criteria == 'all':
        response = stats.get_all_reports()
    else:
        response = stats.get_reports_by_group(view_criteria)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


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
