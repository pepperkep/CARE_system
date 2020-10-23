from flask import request, abort, json, session
from datetime import datetime
from database.database_handler import DatabaseHandler




class Report:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_report(report_id, content, timestamp):
        report_doc =  {"_id":report_id,
            "content":request.form['content'],
            "timestamp":timestamp
            }
        self.db_handler.create(report_doc)
        return report_doc

    def delete_report(report_id):
        self.db_handler.delete(db.find({"_id":report_id}))


    def update_report_contents(report_id):
        new_content = { "$set": {'content': request.form['new_content']}}
        self.db_handler.update(db.find({"_id":report_id}), new_content)
        return self.db_handler.find({"_id":report_id})


    def view_report(report_id):
        return self.db_handler.find({"_id":report_id})
