import unittest
import src.app
from src.report import Report
from src.database.database_handler import DatabaseHandler
from datetime import datetime
from unittest.mock import MagicMock, patch
from flask import json, Flask


flask_app = Flask(__name__)

class TestReportFunc(unittest.TestCase):

    def setUp(self):
        with flask_app.test_request_context(path='/report/256', method='POST', json={'group': 'foo', 'content': 'COVID','report' : 'Lacrosse' ,'timestamp': datetime.today().strftime ('%d%m%Y')}):
            src.app.update_reports('256')

    def tearDown(self):
        with flask_app.test_request_context(path='/report/256', method='DELETE'):
            src.app.update_reports('256')
        with flask_app.test_request_context(path='/report/4256', method='DELETE'):
            src.app.update_reports('4256')

    def test_add_report(self):
        expected_result = {'group': 'foo', 'content': 'COVID','report': 'Lacrosse' ,'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  4256}
        with flask_app.test_request_context('report/4256', method='POST', json={'group': 'foo', 'content': 'COVID','report' : 'Lacrosse' ,'timestamp': datetime.today().strftime ('%d%m%Y')}):
            actual_result = src.app.update_reports('4256')
            self.assertEqual(expected_result, actual_result)

    def test_view_report(self):
        expected_result = {'group': 'foo', 'content': 'COVID', 'report' : 'Lacrosse' ,'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  256}
        with flask_app.test_request_context('report/256', method='GET', json={'group': 'foo', 'content': 'COVID', 'report' : 'Lacrosse' ,'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  256}):
            actual_result = src.app.update_reports('256')
            self.assertEqual(expected_result, actual_result)

    def test_delete_report(self):
        expected_result = None
        with flask_app.test_request_context(path='/report/46', method='POST', json={'group': 'foo', 'content': 'COVID','report' : 'Lacrosse' ,'timestamp': datetime.today().strftime ('%d%m%Y')}):
            src.app.update_reports('46')
        with flask_app.test_request_context('report/46', method='DELETE'):
            actual_result = src.app.update_reports('46')
            self.assertEqual(expected_result, actual_result)

    def test_update_report(self):
        expected_result = {'group': 'foo', 'content': 'COVID', 'report' : 'Lacrosse', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  4256}
        with flask_app.test_request_context('report/4256', method='PUT', json={'group': 'foo', 'content': 'COVID', 'report' : 'Lacrosse' ,'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  4256}):
            actual_result = src.app.update_reports('4256')
            self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()
