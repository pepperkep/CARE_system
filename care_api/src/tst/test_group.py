import unittest
from src.group import Group
from src.database.database_handler import DatabaseHandler
from unittest.mock import MagicMock, patch
from flask import json, Flask


app = Flask(__name__)

class TestGroup(unittest.TestCase):

    def setUp(self):
        self.mock_db_handler = MagicMock()
        self.group = Group(self.mock_db_handler)

    def test_add_group(self):
        self.mock_db_handler.create.return_value = 'test'
        expected_result = {'name': 'marx', 'description':'group','_id':  45}
        with app.test_request_context(45, json=json.dumps({'name': 'marx', 'description': 'group'})):
            actual_result = self.group.add_group(45)
            self.assertEqual(expected_result, actual_result)

    def test_view_group(self):
        expected_result = {'name': 'marx', 'description':'group','_id':  45}
        with app.test_request_context(45, json=json.dumps({'name': 'marx', 'description': 'group'})):
            actual_result = self.mock_db_handler.find(45)
        self.assertEqual(expected_result, actual_result)

    def test_delete_group(self):
        self.mock_db_handler.find.return_value = 'foo'
        expected_result = {'_id':  45}
        with app.test_request_context(45):
            actual_result = self.group.delete_group('45')
            self.assertEqual(expected_result, actual_result)

    def test_update_group(self):
        self.mock_db_handler.create.return_value = 'test'
        expected_result = {'name': 'marx', 'description':'group','_id':  45}
        with app.test_request_context(45, json=json.dumps({'name': 'marx', 'description': 'group'})):
            actual_result = self.group.update_group(45)
            self.assertEqual(expected_result, actual_result)



if __name__ == '__main__':
    unittest.main()
