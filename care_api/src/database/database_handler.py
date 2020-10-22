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

    def init_connection(database_name):
        if not self.is_connected:
            connection_string = get_connect_string(self.db_config)
            self.db_client = MongoClient(connection_uri)
        self.is_connected = check_connection()
        if self.is_connected:
            self.db = getattr(self, database_name)

    def close_connection():
        self.db_client.close()
        self.is_connected = False

    def find_all(self, selector):
        return self.db.find(selector)

    def find(self, selector):
        return self.db.find_one(selector)

    def create(self, doc):
        return self.db.insert_one(doc)

    def update(self, selector, doc):
        return self.db.replace_one(selector, doc).modified_count

    def delete(self, selector):
        return self.db.delete_one(selector).deleted_count

    def __init__(self, config_file_path, database_name):
        config = ConfigParser()
        config.read('config_file_path')
        self.db_config = config['mongodb']
        self.db_client = None
        self.db = None
        self.is_connected = False
        self.init_connection(database_name)

    def __del__(self):
        self.close_connection()
