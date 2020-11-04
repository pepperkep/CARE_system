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

    def test_total_reports(self):
        self.mock_db_handler.create.return_value = 'test'
        #expected_result = {'_id': None, 'total reports': 1}
        expected_result = None
        with app.test_request_context('report/45', json={'content': 'COVID','group' : 'Lacrosse' ,'timestamp': datetime.today().strftime ('%d%m%Y')}):
            self.report.add_report(45)
            actual_result = self.stats.total_reports()
            self.assertEqual(expected_result, actual_result)
