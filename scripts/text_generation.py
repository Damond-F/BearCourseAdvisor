import openai
from dotenv import load_dotenv
import pymongo
import csv
import os

def query_data(course):
    load_dotenv()
    mongoConnection = os.getenv('MONGO_CONNECTION')
    client = pymongo.MongoClient(mongoConnection)

def generate_text(data):
    openai_ai_key = os.getenv("OPENAI_AI_KEY")


