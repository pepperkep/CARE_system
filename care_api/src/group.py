from flask import request, abort, json, session
from database.database_handler import DatabaseHandler as db





class Group:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_group(group_id):
        group_doc =  {"_id":group_id,
            "name":request.form['name'],
            "description":request.form['description']
            }
        db.create(group_doc)
        return group_doc

    def delete_group(group_id):
        db.delete(db.find({"_id":group_id}))


    def update_group(group_id):
        new_name = { "$set": {'name': request.form['new_name']}}
        new_descritpion = { "$set": {'description': request.form['new_description']}}
        db.update(db.find({"_id":group_id}), new_name)
        db.update(db.find({"_id":group_id}), new_description)
        return db.find({"_id":group_id})

    def view_group(group_id):
        return db.find({"_id":group_id})
