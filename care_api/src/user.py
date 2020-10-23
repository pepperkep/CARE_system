from flask import request, abort
from database.database_handler import DatabaseHandler

class User:

    def __init__():
        

    def determine_action(path):
       
        path_list = path.split("/")
        params = tuple(path_list[1:])
        action = path_list[0]
        print(action)
        if action == 'signup':
            return signup(*params)
        if action == 'login':
            return login(*params)
        if action == change_password:
            return change_password(*params)
        if request.method == 'DELETE':
            return delete_account(action, *params)
        abort(404)

    def signup(user_id):
        return user_id

    def login(login_id):
        return login_id

    def change_password(old_pass, new_pass):
        return new_pass

    def delete_account(account_id):
        return account_id
