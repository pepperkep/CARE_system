from flask import request, abort, json, session
from database.database_handler import DatabaseHandler



class Group:

    def __init__(self, db_handler):
        self.db_handler = db_handler


    def add_group(self, group_id):
        request_data = json.loads(request.json)
        group_doc =  {"_id":group_id,
            "name":request_data['name'],
            "description":request_data['description']
            }
        self.db_handler.create('group',group_doc)
        return group_doc

    def delete_group(self,group_id):
        self.db_handler.delete('group', {"_id":group_id})


    def update_group(self, group_id):
        request_data = json.loads(request.json)
        new_val = {"$set": {'name': request_data['name'],'description':request_data['description']}}
        self.db_handler.update('group',{"_id":group_id}, new_val)
        return request_data

    def view_group(self,view_id):
        return self.db_handler.find('group',{"_id":int(view_id)})
