from flask import request, abort, json, session
from database.database_handler import DatabaseHandler
import time

class User:

    def __init__(self, db_handler, login_time=5000):
        self.db_handler = db_handler
        self.login_time = login_time

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
            return self.access_user(action, *params)
        if request.method == 'DELETE':
            return self.delete_account(action, *params)
        abort(404)

    def signup(self, username):
        request_data = request.json

        query = {'username': username}
        existing_user = self.db_handler.find('user', query)
        if existing_user is not None:
            return {'user_created': False}

        self.db_handler.gurantee_index('user', 'user_id')
        largest_id = self.db_handler.get_max('user', 'user_id')
        if largest_id is None:
            largest_id = -1 
        try:
            user_doc = {
                    'user_id': largest_id + 1,
                    'username': str(username),
                    'password': request_data['password'],
                    'is_admin': False}
        except KeyError:
            abort(400)
        self.db_handler.create('user', user_doc)
        response_dict = user_doc
        if 'password' in response_dict:
            del response_dict['password']
        if '_id' in response_dict:
            del response_dict['_id']
        response_dict['user_created'] = True
        return response_dict

    def login(self):
        request_data = request.json
        try:
            query = {'username': request_data['username']}
        except KeyError:
            return {'success': False, 'reason': 'username field not in request'}
        result = self.db_handler.find('user', query)
        if result is None:
            abort(404)
        if request_data['password'] == result['password']:
            session['id'] = result['user_id']
            session['username'] = request_data['username']
            session['is_admin']  = result['is_admin']
            session['timestamp'] = time.time()
        else:
            return {'success': False, 'reason': 'wrong password'}
        return {'success': True, 'user_id': result['user_id']}

    def is_logged_in(self):
        if 'id' in session:
            if time.time() - session['timestamp'] > self.login_time:
                self.logout(user_id)
                return False
            else:
                return True
        return False

    def is_authorized(self):
        if self.is_logged_in():
            return session['is_admin']

    def logout(self):
        session.pop('id', None)
        session.pop('username', None)
        session.pop('is_admin', None)
        session.pop('timestamp', None)
        return {}

    def change_password(self, username):
        if session['username'] == username:
            request_data = request.json
            try:
                query = {'user_id': request_data['id']}
            except KeyError:
                abort(400)
            change = { "$set": {'password': request_data['new_password']}}
            self.db_handler.update('user', query, change)
            return query
        abort(403)
        
    def access_user(self, account_id):
        query = {'user_id': int(account_id)}
        result =  self.db_handler.find('user', query)
        del result['password']
        del result['_id']
        if result != None:
            return result
        else:
            abort(404)

    def delete_account(self, account_id):
        query = {'user_id': int(account_id)}
        self.db_handler.delete('user', query)
        return query
