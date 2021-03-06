from flask import request, abort, session
from database.database_handler import DatabaseHandler
from src.report import Report


# Class that handles aggregation methods
class Stats:

# Initialize connection to the database through the DatabaseHandler class and to the Reports class for aggregate queries
    def __init__(self, db_handler):
        self.db_handler = db_handler
        self.report = Report(self.db_handler)

# Returns all the reports within the database
    def get_all_reports(self):
        reports = self.db_handler.find_all('report', {}, {"_id": 0})
        return reports

# Returns all the reports within the database by group
    def get_reports_by_group(self, group_name):
        reports = self.db_handler.find_all('report', {"group":group_name}, {"_id": 0})
        return reports

# Returns total number of reports
    def total_reports(self):
        report_db = self.db_handler.db['report']
        # Aggregation of all reports
        cursor = report_db.aggregate([{"$group":
               {"_id":"$None",
               "total reports":{"$sum": 1}
               }
               }])
        for document in cursor:
             print(document)

# Returns total number of reports per group
    def num_reports_per_group(self):
        report_db = self.db_handler.db['report']
        # Aggregation by group
        cursor = report_db.aggregate([{"$group":
               {"_id":"$group",
               "similar_groups":{"$sum":1}
               }
               }])

        for document in cursor:
               print(document)

# Returns total number of reports from a specific group
    def num_reports_from_group(self, group_id):
        report_db = self.db_handler.db['report']
        # Aggregation for the input group
        cursor = report_db.aggregate([{"$group":
               {"_id": group_id,
               "total reports":{"$sum": 1}
               }
               }])

        for document in cursor:
             print(document)

# Returns the most recent reports based on the input number reports
    def most_recent_reports(self, num_reports):
        return self.db_handler.find_sorted('report', 'timestamp', int(num_reports),  {"_id": 0})

# Returns total number of reports for each day
    def num_reports_per_day(self):
        report_db = self.db_handler.db['report']
        # Aggregation by timestamp
        cursor = report_db.aggregate([{"$group":
               {"_id":"$timestamp",
               "similar_groups":{"$sum":1}
               }
               }])

        for document in cursor:
               print(document)
