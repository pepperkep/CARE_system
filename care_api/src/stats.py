from flask import request, abort, session
from database.database_handler import DatabaseHandler
from src.user import User
from src.database.database_handler import DatabaseHandler
from src.group import Group
from src.report import Report

class Stats:

    def __init__(self, db_handler):
        self.db_handler = db_handler

    def total_reports(self):
        pass

    def num_reports_from_group(self, group_id):
        pass

    def num_reports_per_group(self):
        pass

    def num_reports_per_day(self):
        pass
