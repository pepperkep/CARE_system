import unittest
import src.app
from src.database.database_handler import DatabaseHandler
from flask import json, Flask, session

flask_app = Flask(__name__)
flask_app.secret_key = 123

class TestUserFunc(unittest.TestCase):

    def setUp(self):
        with flask_app.test_request_context(path='/account/signup', json={'username': 'abc123', 'password': '****'}):
            src.app.update_account('signup')

    def tearDown(self):
        with flask_app.test_request_context(path='/account/5', method='DELETE'):
            src.app.update_account('5')
        with flask_app.test_request_context(path='/account/46', method='DELETE'):
            src.app.update_account('46')


    def test_sign_up(self):
        expected_result = {'username': 'abc123', '_id':  46, 'is_admin': False}
        with flask_app.test_request_context(path='/account/signup', json={'username': 'abc123', 'password': '****'}):
            actual_result = src.app.update_account('signup')
            self.assertEqual(expected_result, actual_result)

    def test_login(self):
        expected_result = 5
        with flask_app.test_request_context(path='/account/login/5', json={'username': 'abc123', 'password': '****'}):
            src.app.update_account('login/5')
            actual_result = session['id']
            self.assertEqual(expected_result, actual_result)

    def test_logout(self):
        with flask_app.test_request_context(path='/account/login/5', json={'username': 'abc123', 'password': '****'}):
            src.app.update_account('login/5')
        with flask_app.test_request_context(path='logout', json=json.dumps({'username': 'abc123', 'password': '****'})):
            with self.assertRaises(KeyError):
                session[5]

    def test_change_password(self):
        with flask_app.test_request_context(path='/account/change_password/abc123', json={'id': 5, 'password': '****', 'new_password': '***'}):
            actual_result = src.app.update_account('change_password/abc123')
            expected_result = {'_id':  5}
            self.assertEqual(expected_result, actual_result)

    def test_access_user(self):
        expected_result = {'username': 'abc123', '_id':  5, 'is_admin': False}
        with flask_app.test_request_context(path='/account/5'):
            actual_result = src.app.update_account('5')
            self.assertEqual(expected_result, actual_result)

    def test_delete_user(self):
        expected_result = {'_id':  47}
        with flask_app.test_request_context(path='/account/signup/47', json={'username': 'abc123', 'password': '****'}):
            src.app.update_account('signup/46')
        with flask_app.test_request_context(path='/account/47', method='DELETE'):
            actual_result = src.app.update_account('47')
            self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()
