from flask import Flask
from pymongo import MongoClient
from configparser import ConfigParser
import datetime as datetime
from database import database_handler as db
from app import care_app



@care_app.route('/group/<int:group_id>', methods=[ 'POST'])
def add_group(group_id):
    pass

@care_app.route('/group/<int:group_id>', methods=[ 'DELETE'])
def delete_group(group_id):
    pass

@care_app.route('/group/<int:group_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def update_group(report_id):
    pass

@care_app.route('/report/<path:view_criteria>', methods=['GET'])
def view_group_by_criteria(view_criteria):
    pass
