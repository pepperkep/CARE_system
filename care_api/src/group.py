from flask import request, abort, json, session
from database.database_handler import DatabaseHandler





class Group:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_group(group_id):
        group_doc =  {"_id":group_id,
            "name":request.form['name'],
            "description":request.form['description']
            }
        self.db_handler.create(group_doc)
        return group_doc

    def delete_group(group_id):
        self.db_handler.delete(db.find({"_id":group_id}))


    def update_group(group_id):
        new_name = { "$set": {'name': request.form['new_name']}}
        new_descritpion = { "$set": {'description': request.form['new_description']}}
        self.db_handler.update(db.find({"_id":group_id}), new_name)
        self.db_handler.update(db.find({"_id":group_id}), new_description)
        return self.db_handler.find({"_id":group_id})

    def view_group(group_id):
        return self.db_handler.find({"_id":group_id})
