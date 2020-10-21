from pymongo import MongoClient
from configparser import ConfigParser
from urllib.parse import quote_plus

class DatabaseHandler:

    def get_connect_string(db_config):
        connection_uri = 'mongodb://{}:{}@{}:{}'.format( \
                quote_plus(db_config['username']), \
                quote_plus(db_config['password']), \
                db_config['host'], \
                db_config['port'])

    def check_connection():
        try:
            # The ismaster command is cheap and does not require auth.
            client.admin.command('ismaster')
            return True
        except ConnectionFailure:
            return False

    def init_connection():
        if not self.is_connected:
            connection_string = get_connect_string(self.db_config)
            self.db_client = MongoClient(connection_uri)
        self.is_connected = check_connection()

    def close_connection():
        self.db_client.close()
        self.is_connected = False

    def __init__(self, config_file_path):
        config = ConfigParser()
        config.read('config_file_path')
        self.db_config = config['mongodb']
        self.db_client = None
        self.is_connected = False
        self.init_connection()

    def __del__(self):
        self.close_connection()
