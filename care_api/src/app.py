from flask import Flask, request
import user

# Instantiate Flask app
care_app = Flask('care_api')


@care_app.route('/account/<path:action>', methods=['POST', 'DELETE'])
def update_account(action):
    return user.determine_action(action)

@care_app.route('/group/<int:group_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def change_groups(group_id):
    pass

@care_app.route('/group/recommend/<int:recommend_id>', methods=['POST'])
def add_recommendation(recommend_id):
    pass

@care_app.route('/group/recommend-approve/<int:recommend_id>', methods=['POST'])
def approve_recommendation(recommend_id):
    pass

@care_app.route('/report/<int:report_id>', methods=['GET', 'PUT', 'POST', 'DELETE']) 
def update_reports(report_id):
    pass

@care_app.route('/report/<path:view_criteria>', methods=['GET']) 
def view_reports_by_criteria(view_criteria):
    pass

@care_app.route('/report/spam/<int:report_id>', methods=['POST'])
def is_report_spam(report_id):
    pass

@care_app.route('/faq/<int:question_id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def update_faq(question_id):
    pass

@care_app.route('/faq/request/<int:request_id>', methods=['GET', 'POST', 'DELETE'])
def manmage_faq_request(request_id):
    pass
