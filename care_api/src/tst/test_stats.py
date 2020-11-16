import unittest
from src.report import Report
from src.stats import Stats
from src.database.database_handler import DatabaseHandler
from datetime import datetime
from unittest.mock import MagicMock, patch
from flask import json, Flask

app = Flask(__name__)

class TestStats(unittest.TestCase):

    def setUp(self):
        self.mock_db_handler = MagicMock()
        self.report = Report(self.mock_db_handler)
        self.stats = Stats(self.mock_db_handler)
        with app.test_request_context('report/45', json={'content': 'COVID','group' : 'Lacrosse' ,'timestamp': datetime.today().strftime ('%d%m%Y')}):
            self.report.add_report(45)


    def test_get_all_reports(self):
        self.mock_db_handler.create.return_value = 'test'
        self.mock_db_handler.find_all.return_value = {'content': 'COVID','group' : 'Lacrosse' ,'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45}
        expected_result = {'content': 'COVID','group' : 'Lacrosse' ,'timestamp':datetime.today().strftime ('%d%m%Y'),'_id':  45}
        actual_result = self.stats.get_all_reports()
        self.assertEqual(expected_result, actual_result)

    
