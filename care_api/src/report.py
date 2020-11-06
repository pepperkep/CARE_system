from flask import request, abort, json, session
from datetime import datetime
from database.database_handler import DatabaseHandler




class Report:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_report(self, report_id, timestamp = datetime.today().strftime ('%d%m%Y')):
        request_data = request.json
        report_doc =  {"_id":int(report_id),"group":request_data['group'],
            "content":request_data['content'],
            "timestamp":timestamp,
            "report":request_data['report']
            }
        self.db_handler.create('report', report_doc)
        return report_doc

    def delete_report(self, report_id):
        self.db_handler.delete('report', {"_id": int(report_id)})
        return None


    def update_report_contents(self, report_id):
        request_data = request.json
        new_content = {"$set": {'content': request_data['content'],'group' : request_data['group']}}
        self.db_handler.update('report',{"_id":int(report_id)}, new_content)
        return request_data


    def view_report(self, view_id):
        return self.db_handler.find('report', {"_id":int(view_id)})
