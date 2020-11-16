import unittest
from src.user import User
from src.database.database_handler import DatabaseHandler
from unittest.mock import MagicMock, patch
from flask import json, Flask, session

app = Flask(__name__)
app.secret_key = 123

class TestUser(unittest.TestCase):

    def setUp(self):
        self.mock_db_handler = MagicMock()
        self.user = User(self.mock_db_handler)

    def test_sign_in(self):
        self.mock_db_handler.create.return_value = 'test'
        expected_result = {'username': 'abc123', '_id':  45, 'is_admin': False}
        with app.test_request_context(path='/account/signup/45', json={'username': 'abc123', 'password': '****'}):
            actual_result = self.user.determine_action('signup/45')
            self.assertEqual(expected_result, actual_result)

    def test_login(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', '_id':  45, 'password': '****', 'is_admin': False}
        expected_result = 45
        with app.test_request_context(path='/account/login/45', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login/45')
            actual_result = session['id']
            self.assertEqual(expected_result, actual_result)

    def test_login(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', '_id':  45, 'password': '****', 'is_admin': False}
        expected_result = True
        with app.test_request_context(path='/account/login/45', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login/45')
            actual_result = self.user.is_logged_in()
            self.assertEqual(expected_result, actual_result)

    def test_is_authorized(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', '_id':  45, 'password': '****', 'is_admin': True}
        expected_result = True
        with app.test_request_context(path='/account/login/45', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login/45')
            actual_result = self.user.is_authorized()
            self.assertEqual(expected_result, actual_result)

    def test_logout(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', '_id':  45, 'password': '****', 'is_admin': False}
        with app.test_request_context(path='/account/login/45', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login/45')
        with app.test_request_context(path='logout', json=json.dumps({'username': 'abc123', 'password': '****'})):
            with self.assertRaises(KeyError):
                session[45]

    def test_change_password(self):
        self.mock_db_handler.update.return_value = 'test'
        expected_result = {'_id':  45}
        with app.test_request_context(path='/account/change_password/abc123', json={'id': 45, 'password': '****', 'new_password': '***'}):
            actual_result = self.user.determine_action('change_password/abc123')
            self.assertEqual(expected_result, actual_result)

    def test_delete_user(self):
        self.mock_db_handler.find.return_value = 'foo'
        expected_result = {'_id':  45}
        with app.test_request_context(path='/account/45', method='DELETE'):
            actual_result = self.user.determine_action('45')
            self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()
