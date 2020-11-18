from pymongo import MongoClient, ASCENDING
from pymongo.errors import ConnectionFailure
from configparser import ConfigParser
from urllib.parse import quote_plus

class DatabaseHandler:

    def get_connect_string(self, db_config):
        connection_uri = 'mongodb://{}:{}'.format( \
                db_config['host'], \
                db_config['port'])
        return connection_uri

    def check_connection(self):
        try:
            self.db_client.admin.command('ismaster')
            return True
        except ConnectionFailure:
            return False

    def init_connection(self, database_name):
        if not self.is_connected:
            connection_string = self.get_connect_string(self.db_config)
            self.db_client = MongoClient(connection_string)
        self.is_connected = self.check_connection()
        if self.is_connected:
            self.db = getattr(self.db_client, database_name)

    def close_connection(self):
        self.db_client.close()
        self.is_connected = False

    def gurantee_index(self, collection_name, index_name):
        self.db[collection_name].create_index(index_name)

    def find_all(self, collection_name, selector, included_fields=None):
        return list(self.db[collection_name].find(selector, included_fields))

    def find(self, collection_name, selector):
        return self.db[collection_name].find_one(selector)

    def create(self, collection_name, doc):
        return self.db[collection_name].insert_one(doc)

    def update(self, collection_name, selector, doc):
        return self.db[collection_name].update_one(selector, doc).modified_count

    def get_max(self, collection_name, field_name):
        max_list = self.db[collection_name].find().sort([(field_name, -1)]).limit(1)
        if max_list.count() > 0:
            return max_list[0][field_name]
        else:
            return None

    def delete(self, collection_name, selector):
        return self.db[collection_name].delete_one(selector).deleted_count

    def __init__(self, config_file_path, database_name):
        config = ConfigParser()
        config.read(config_file_path)
        self.db_config = config['mongodb']
        self.db_client = None
        self.db = None
        self.is_connected = False
        self.init_connection(database_name)

    def __del__(self):
        self.close_connection()
