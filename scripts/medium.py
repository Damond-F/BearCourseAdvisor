import requests
import pymongo
from dotenv import load_dotenv
import certifi
import os
import json

load_dotenv()
mongoPW = os.getenv('MONGO_PW')
client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())

db = client['classes']
cs = db['cs']


medium = '''
Introduction to Database Systems is a solid class to take — it has a manageable workload, fair exams, and is very useful for systems design interviews. No matter what you decide to do in computer science, it’s good to know how a database system works. One thing to note is that the CS W186 version of this class is run completely online, but online lectures are set up in an easily digestible format.
'''

Course_name = 'COMPSCI186'

cs.update_one(
        { "Course Name": Course_name},
        { "$set": {'more more info': medium}}
    )