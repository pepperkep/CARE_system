import unittest
import src.app
from src.database.database_handler import DatabaseHandler
from flask import json, Flask, session

flask_app = Flask(__name__)
flask_app.secret_key = 123

class TestGroupFunc(unittest.TestCase):

    def setUp(self):
        with app.test_request_context('group/45', json={'name': 'Jeb', 'description': 'group'}, method='POST'):
            src.app.change_groups('group/45')

    def tearDown(self):
        with flask_app.test_request_context('group/45', method='DELETE'):
            src.app.change_groups('group/45')


    def test_add_group_func(self):
        expected_result = {'name': 'marx', 'description':'group','_id':  46}
        with app.test_request_context('group/46', json={'name': 'marx', 'description': 'group'}, method = 'POST'):
            actual_result = src.app.change_groups('group/46')
            self.assertEqual(expected_result, actual_result)

    def test_view_group_func(self):
        expected_result = {'name': 'marx', 'description':'group','_id':  46}
        with app.test_request_context('group/46', json={'name': 'marx', 'description': 'group'}, method='GET'):
            actual_result = src.app.change_groups(46)
            self.assertEqual(expected_result, actual_result)

    def test_delete_group(self):
        expected_result = None
        with app.test_request_context('group/45', method = 'DELETE'):
            actual_result = src.app.change_groups('46')
            self.assertEqual(expected_result, actual_result)

    def test_update_group(self):
        expected_result = {'name': 'marx', 'description': 'group'}
        with app.test_request_context('group/45', json={'name': 'marx', 'description': 'group'}, method = 'PUT'):
            actual_result = src.app.change_groups(45)
            self.assertEqual(expected_result, actual_result)

    def test_recommend_group(self):
        expected_result = {'name': 'marx', 'description':'group','_id':  45}
        with app.test_request_context('group/45', json={'name': 'marx', 'description': 'group'}):
            actual_result = src.app.add_recommendation(45)
            self.assertEqual(expected_result, actual_result)


if __name__ == '__main__':
    unittest.main()
