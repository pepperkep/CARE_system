from flask import request, abort, session
from database.database_handler import DatabaseHandler


# Class that hndles CRUD operations related to on campus groups
class Group:

# Initialize connection to the database through the DatabaseHandler class
    def __init__(self, db_handler):
        self.db_handler = db_handler

# Add groups to the database with a unique id
    def add_group(self, group_id):

        request_data = request.json
        try:
            group_doc =  {"group_id":int(group_id),
                "name":request_data['name'],
                "description":request_data['description']
                }
        except KeyError:
            abort(400)
        self.db_handler.create('group',group_doc)
        del group_doc['_id']
        return group_doc

# Removes the group from the database with the input group_id
    def delete_group(self,group_id):
        if not session['is_admin']:
            abort(403)
        self.db_handler.delete('group', {"group_id":int(group_id)})

# Update the contents of a group's information, its name or description, in the database
    def update_group(self, group_id):

        request_data = request.json
        new_val = {"$set": {'name': request_data['name'],'description':request_data['description']}}
        self.db_handler.update('group',{"group_id":int(group_id)}, new_val)
        return request_data

# View a group's name and description.
    def view_group(self,view_id):
        response = self.db_handler.find('group',{"group_id":int(view_id)})
        del response['_id']
        return response

# View all groups currently within the database
    def view_all_groups(self):
        response = self.db_handler.find_all('group', {}, {'_id': 0})

        return response

# Recommend a group to be added to the list of groups
    def recommend_group(self, recommend_id):
        request_data = request.json
        recommend_doc =  {"group_id":int(recommend_id),
            "name":request_data['name'],
            "description":request_data['description']
            }
        self.db_handler.create('recommendation',recommend_doc)
        del recommend_doc['_id']
        return recommend_doc

# Handles whether a user recommended group will be added to the list of groups on the application
    def recommendation_action(self, recommend_id):

        recommendation = self.db_handler.find('recommendation', {'recommendation_id': int(recommend_id)})
        if recommendation is not None:
            self.db_handler.delete('recommendation', {'recommendation_id': int(recommend_id)})
            if bool(request.json['accept']):
                name = recommendation['name'] if 'name' not in request.json else request.json['name']
                description = recommendation['description'] if 'description' not in request.json else request.json['description']
                self.db_handler.gurantee_index('group', 'group_id')
                largest_id = self.db_handler.get_max('group', 'group_id')
                if largest_id is None:
                    largest_id = -1
                group_doc = {"group_id": largest_id + 1, "name": name, "description": description}
                create_response = self.db_handler.create('group', group_doc)
                create_response['accept'] = True
                return create_response
            else:
                return {'accept': False}
        else:
            abort(404)
