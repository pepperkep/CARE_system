from flask import request, abort, json
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
        if action == 'change_password':
            return self.change_password(*params)
        if request.method == 'GET':
            return self.access_user(action, *params)
        if request.method == 'DELETE':
            return self.delete_account(action, *params)
        abort(404)

    def signup(self, user_id):
        try:
            user_doc = {'_id': user_id,
                    'username': request.form['username'],
                    'password': request.form['password']}
        except KeyError:
            abort(400)
        self.db_handler.create('user', user_doc)
        response_dict = dict(user_doc)
        del response_dict['password']
        return response_dict

    def login(self, login_id):
        return login_id

    def change_password(self, username):
        try:
            query = {'_id': request.form['id'],
        except KeyError:
            abort(400)
        change = { "$set": {'password': request.form['new_password']}}
        self.db_handler.update('user', query, change)
        return query
        
    def access_user(self, account_id):
        try:
            query = {'_id': account_id}
        except KeyError:
            abort(400)
        self.db_handler.find_one('user', query, change)
        return query

    def delete_account(self, account_id):
        try:
            query = {'_id': account_id}
        except KeyError:
            abort(400)
        query = {'_id': account_id}
        self.db_handler.delete('user', query, change)
        return query
