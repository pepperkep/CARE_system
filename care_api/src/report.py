from flask import request, abort, json, session
from datetime import datetime
from database.database_handler import DatabaseHandler

class Report:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_report(self, timestamp = datetime.today().strftime ('%d%m%Y')):
        request_data = request.json
        self.db_handler.gurantee_index('report', 'report_id')
        largest_id = self.db_handler.get_max('report', 'report_id')
        if largest_id is None:
            largest_id = -1

        try:
            report_doc =  {"report_id":int(largest_id) + 1,
                "group":request_data['group'],
                "content":request_data['content'],
                "timestamp":timestamp,
                "user_id": request_data["user_id"]
                }
            self.db_handler.create('report', report_doc)
        except KeyError:
            if "id" not in session:
                abort(403)
            abort(400)
        del report_doc['_id']
        return report_doc

    def delete_report(self, report_id):
        #if not session['is_admin']:
        #    abort(403)
        self.db_handler.delete('report', {"report_id": int(report_id)})
        return None

    def update_report_contents(self, report_id):
        report = self.db_handler.find('report', {"report_id":int(report_id)})
        if report is None:
            abort(404)
        if not session['is_admin'] and not report['user_id'] == session['id']:
            abort(403)
        request_data = request.json
        new_content = {"$set": {'content': request_data['content'],'group' : request_data['group']}}
        self.db_handler.update('report',{"report_id":int(report_id)}, new_content)
        return request_data


    def view_report(self, view_id):
        report = self.db_handler.find('report', {"report_id":int(view_id)})
        del report['_id']
        return report
