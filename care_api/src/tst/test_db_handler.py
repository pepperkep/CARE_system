import unittest
from unittest.mock import MagicMock, patch
from src.database.database_handler import DatabaseHandler

class TestDBHandler(unittest.TestCase):
   
    @patch('src.database.database_handler.MongoClient')
    @patch('src.database.database_handler.ConfigParser')
    def test_initialization(self, mock_config_parser, mock_mongo):
        db_handler = DatabaseHandler('example.ini', 'example')
        assert db_handler.is_connected

if __name__ == '__main__':
    unittest.main()
                          
