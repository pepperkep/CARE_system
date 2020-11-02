from flask import request, abort, json, session
from database.database_handler import DatabaseHandler

class User:

    def __init__(self, db_handler):
        self.db_handler = db_handler

    def determine_action(self, path):
       
        path_list = path.split("/")
        params = tuple(path_list[1:])
        action = path_list[0]
        if action == 'signup':
            return self.signup(*params)
        if action == 'login':
            return self.login(*params)
        if action == 'logout':
            return self.login(*params)
        if action == 'change_password':
            return self.change_password(*params)
        if request.method == 'GET':
            print(*params)
            return self.access_user(action, *params)
        if request.method == 'DELETE':
            return self.delete_account(action, *params)
        abort(404)

    def signup(self, user_id):
        request_data = request.json
        try:
            user_doc = {'_id': int(user_id),
                    'username': request_data['username'],
                    'password': request_data['password']}
        except KeyError:
            abort(400)
        self.db_handler.create('user', user_doc)
        response_dict = dict(user_doc)
        del response_dict['password']
        return response_dict

    def login(self, login_id):
        request_data = request.json
        try:
            query = {'_id': int(login_id)}
        except KeyError:
            abort(400)
        result = self.db_handler.find('user', query)
        if request_data['username'] == result['username'] and request_data['password'] == result['password']:
            session[int(login_id)] = int(login_id)
        else:
            abort(401)
        return {}

    def logout(self, login_id):
        session.pop(int(login_id), None)
        return {}

    def change_password(self, username):
        request_data = request.json
        try:
            query = {'_id': request_data['id']}
        except KeyError:
            abort(400)
        change = { "$set": {'password': request_data['new_password']}}
        self.db_handler.update('user', query, change)
        return query
        
    def access_user(self, account_id):
        query = {'_id': int(account_id)}
        result =  self.db_handler.find('user', query)
        if result != None:
            return result
        else:
            abort(404)

    def delete_account(self, account_id):
        query = {'_id': int(account_id)}
        self.db_handler.delete('user', query)
        return query
