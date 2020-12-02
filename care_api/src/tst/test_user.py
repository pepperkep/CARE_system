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

    def test_sign_up(self):
        self.mock_db_handler.create.return_value = {'username': 'abc123', 'user_id':  45, 'password': '***', 'is_admin': False}
        self.mock_db_handler.get_max.return_value = 44
        self.mock_db_handler.find.return_value = None
        expected_result = {'is_admin': False, 'user_created': True, 'username': 'abc123', 'user_id': 45}
        with app.test_request_context(path='/account/signup/abc123', json={'username': 'abc123', 'password': '****'}):
            actual_result = self.user.determine_action('signup/abc123')
            self.assertEqual(expected_result, actual_result)

    def test_login(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', 'user_id':  45, 'password': '****', 'is_admin': False}
        expected_result = 45
        with app.test_request_context(path='/account/login', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login')
            actual_result = session['id']
            self.assertEqual(expected_result, actual_result)

    def test_login(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', 'user_id':  45, 'password': '****', 'is_admin': False}
        expected_result = True
        with app.test_request_context(path='/account/login', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login')
            actual_result = self.user.is_logged_in()
            self.assertEqual(expected_result, actual_result)

    def test_is_authorized(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', 'user_id':  45, 'password': '****', 'is_admin': True}
        expected_result = True
        with app.test_request_context(path='/account/login', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login')
            actual_result = self.user.is_authorized()
            self.assertEqual(expected_result, actual_result)

    def test_logout(self):
        self.mock_db_handler.find.return_value = {'username': 'abc123', 'user_id':  45, 'password': '****', 'is_admin': False}
        with app.test_request_context(path='/account/login', json={'username': 'abc123', 'password': '****'}):
            self.user.determine_action('login')
        with app.test_request_context(path='logout', json=json.dumps({'username': 'abc123', 'password': '****'})):
            with self.assertRaises(KeyError):
                session[45]

    def test_delete_user(self):
        self.mock_db_handler.find.return_value = 'foo'
        expected_result = {'user_id':  45}
        with app.test_request_context(path='/account/45', method='DELETE', json={'username': 'abc123', 'password': '***'}):
            actual_result = self.user.determine_action('45')
            self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()
