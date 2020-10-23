import unittest
from src.user import User
from src.database.database_handler import DatabaseHandler
from unittest.mock import MagicMock, patch
from flask import json, Flask

app = Flask(__name__)

class TestUser(unittest.TestCase):

    def setUp(self):
        self.mock_db_handler = MagicMock()
        self.user = User(self.mock_db_handler)

    def test_sign_in(self):
        self.mock_db_handler.create.return_value = 'test'
        expected_result = {'username': 'abc123', '_id':  45}
        with app.test_request_context(path='signup/45', json=json.dumps({'username': 'abc123', 'password': '****'})):
            actual_result = self.user.determine_action('signup/45')
            self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()
