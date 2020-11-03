from flask import request, abort, session
from database.database_handler import DatabaseHandler



class Stats:

    def __init__(self, db_handler):
        self.db_handler = db_handler

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
