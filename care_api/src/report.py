from flask import request, abort, json, session
from datetime import datetime
from database.database_handler import DatabaseHandler as db




class Report:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_report(report_id, content, timestamp):
        report_doc =  {"_id":report_id,
            "content":request.form['content'],
            "timestamp":timestamp
            }
        db.create(report_doc)
        return report_doc

    def delete_report(report_id):
        db.delete(db.find({"_id":report_id}))


    def update_report_contents(report_id):
        new_content = { "$set": {'content': request.form['new_content']}}
        db.update(db.find({"_id":report_id}), new_content)
        return db.find({"_id":report_id})


    def view_report(report_id):
        return db.find({"_id":report_id})
