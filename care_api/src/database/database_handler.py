from pymongo import MongoClient, ASCENDING
from pymongo.errors import ConnectionFailure
from configparser import ConfigParser
from urllib.parse import quote_plus

# Class that handles database operations
class DatabaseHandler:

# Returns connection string for database initialization
    def get_connect_string(self, db_config):
        connection_uri = 'mongodb://{}:{}'.format( \
                db_config['host'], \
                db_config['port'])
        return connection_uri

# Check database connection
    def check_connection(self):
        try:
            self.db_client.admin.command('ismaster')
            return True
        except ConnectionFailure:
            return False

# Initialize connection to the database
    def init_connection(self, database_name):
        if not self.is_connected:
            connection_string = self.get_connect_string(self.db_config)
            self.db_client = MongoClient(connection_string)
        self.is_connected = self.check_connection()
        if self.is_connected:
            self.db = getattr(self.db_client, database_name)

# Close connection to the database
    def close_connection(self):
        self.db_client.close()
        self.is_connected = False

# Creates index for item in the database
    def gurantee_index(self, collection_name, index_name):
        self.db[collection_name].create_index(index_name)

# Find all items from a collection with the specific selector query
    def find_all(self, collection_name, selector, included_fields=None):
        return list(self.db[collection_name].find(selector, included_fields))

# Find a specific object based on the selector query
    def find(self, collection_name, selector):
        return self.db[collection_name].find_one(selector)

# Create an item within a collection within the database
    def create(self, collection_name, doc):
        return self.db[collection_name].insert_one(doc)

# Update an item within a collection within the database
    def update(self, collection_name, selector, doc):
        return self.db[collection_name].update_one(selector, doc).modified_count

# Find the most 3 most recent items in a collection
    def find_sorted(self, collection_name, field_name, num_reports=3, included_fields=None):
        sort_list = self.db[collection_name].find({}, included_fields).sort([(field_name, -1)]).limit(num_reports)
        if sort_list.count() > 0:
            return list(sort_list)
        else:
            return None

# Get max id from a collection
    def get_max(self, collection_name, field_name):
        max_list = self.db[collection_name].find().sort([(field_name, -1)]).limit(1)
        if max_list.count() > 0:
            return max_list[0][field_name]
        else:
            return None

# Delete an item within a collection within the database
    def delete(self, collection_name, selector):
        return self.db[collection_name].delete_one(selector).deleted_count

# Initialize a connection to the MongoDB database
    def __init__(self, config_file_path, database_name):
        config = ConfigParser()
        config.read(config_file_path)
        self.db_config = config['mongodb']
        self.db_client = None
        self.db = None
        self.is_connected = False
        self.init_connection(database_name)

# Close connection 
    def __del__(self):
        self.close_connection()
