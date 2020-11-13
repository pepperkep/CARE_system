from flask import Flask, request
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
care_app.secret_key = config['app']['secret_key']

@care_app.route('/account/<path:action>', methods=['GET', 'POST', 'DELETE'])
def update_account(action):
    current_user = User(DatabaseHandler(config_path, config['mongodb']['db_name']))
    return current_user.determine_action(action)

@care_app.route('/group/<int:group_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def change_groups(group_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if request.method == 'POST':
        return group.add_group(group_id)
    if request.method == 'PUT':
        return group.update_group(group_id)
    if request.method == 'GET':
        return group.view_group(group_id)
    if request.method == 'DELETE':
        return group.delete_group(group_id)

@care_app.route('/group/recommend/<int:recommend_id>', methods=['POST'])
def add_recommendation(recommend_id):
    group = Group(DatabaseHandler(config_path, config['mongodb']['db_name']))
    return group.recommend_group(recommend_id)

@care_app.route('/group/recommend-approve/<int:recommend_id>', methods=['POST'])
def approve_recommendation(recommend_id):
    pass

@care_app.route('/report/<int:report_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def update_reports(report_id):
    report = Report(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if request.method == 'POST':
        return report.add_report(report_id)
    if request.method == 'PUT':
        return report.update_report_contents(report_id)
    if request.method == 'GET':
        return report.view_report(report_id)
    if request.method == 'DELETE':
        return report.delete_report(report_id)

@care_app.route('/report/<path:view_criteria>', methods=['GET'])
def view_reports_by_criteria(view_criteria):
    stats = Stats(DatabaseHandler(config_path, config['mongodb']['db_name']))
    if view_criteria == 'all':
        return stats.get_all_reports()
    else:
        return stats.get_reports_by_group(view_criteria)


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
def mandage_faq_request(request_id):
    pass
