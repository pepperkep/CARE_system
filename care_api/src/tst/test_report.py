import unittest
from src.report import Report
from src.database.database_handler import DatabaseHandler
from datetime import datetime
from unittest.mock import MagicMock, patch
from flask import json, Flask


app = Flask(__name__)

class TestReport(unittest.TestCase):

    def setUp(self):
        self.mock_db_handler = MagicMock()
        self.report = Report(self.mock_db_handler)

    def test_add_report(self):
        self.mock_db_handler.create.return_value = 'test'
        expected_result = {'content': 'COVID', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45}
        with app.test_request_context('report/45', json=json.dumps({'content': 'COVID', 'timestamp': datetime.today().strftime ('%d%m%Y')})):
            actual_result = self.report.add_report(45)
            self.assertEqual(expected_result, actual_result)

    def test_view_report(self):
        self.mock_db_handler.find.return_value = {'content': 'COVID', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45}
        expected_result = {'content': 'COVID', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45}
        with app.test_request_context('report/45', json=json.dumps({'content': 'COVID', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45})):
            actual_result = self.report.view_report(45)
            self.assertEqual(expected_result, actual_result)

    def test_delete_report(self):
        self.mock_db_handler.find.return_value = 'foo'
        expected_result = None
        with app.test_request_context('report/45'):
            actual_result = self.report.delete_report('45')
            self.assertEqual(expected_result, actual_result)

    def test_update_report(self):
        self.mock_db_handler.create.return_value = 'test'
        expected_result = {'content': 'COVID', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45}
        with app.test_request_context('report/45', json=json.dumps({'content': 'COVID', 'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45})):
            actual_result = self.report.update_report_contents(45)
            self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()
