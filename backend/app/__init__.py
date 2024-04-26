from flask import Flask 
from pymongo import MongoClient 
import pymongo
from dotenv import load_dotenv
import certifi
import os 
app = Flask(__name__) 

from app import routes 

cilent = MongoClient('localhost', 5000) 

mongoPW = os.getenv('MONGO_PW')
client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())    
db = client['classes']
cs = db['cs']