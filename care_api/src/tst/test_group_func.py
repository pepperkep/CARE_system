import unittest
import src.app
from src.database.database_handler import DatabaseHandler
from flask import json, Flask, session

flask_app = Flask(__name__)
flask_app.secret_key = 123

class TestGroupFunc(unittest.TestCase):

    def setUp(self):
        with flask_app.test_request_context('group/27', json={'name': 'Jeb', 'description': 'group'}, method='POST'):
            src.app.change_groups('27')

    def tearDown(self):
        with flask_app.test_request_context('group/27', method='DELETE'):
            src.app.change_groups('27')


    def test_add_group_func(self):
        expected_result = {'name': 'marx', 'description':'group','_id':  46}
        with flask_app.test_request_context('group/46', json={'name': 'marx', 'description': 'group'}, method = 'POST'):
            actual_result = src.app.change_groups('46')
            self.assertEqual(expected_result, actual_result)

    def test_delete_group(self):
        expected_result = None
        with flask_app.test_request_context('group/27', method = 'DELETE'):
            actual_result = src.app.change_groups('46')
            self.assertEqual(expected_result, actual_result)

    def test_update_group(self):
        expected_result = {'name': 'marx', 'description': 'group'}
        with flask_app.test_request_context('group/27', json={'name': 'marx', 'description': 'group'}, method = 'PUT'):
            actual_result = src.app.change_groups('27')
            self.assertEqual(expected_result, actual_result)

    def test_recommend_group(self):
        expected_result = {'name': 'marx', 'description':'group','_id':  27}
        with flask_app.test_request_context('group/27', json={'name': 'marx', 'description': 'group'}):
            actual_result = src.app.add_recommendation('27')
            self.assertEqual(expected_result, actual_result)


if __name__ == '__main__':
    unittest.main()
