import openai
from dotenv import load_dotenv
import pymongo
import csv
import os

def query_data(course):
    load_dotenv()
    mongoConnection = os.getenv('MONGO_CONNECTION')
    client = pymongo.MongoClient(mongoConnection)

def generate_text(): # may change what type context is (List of Strings) or just string
    load_dotenv()
    client = openai.OpenAI(api_key=os.environ.get("OPEN_AI_KEY"))
    MODEL = "gpt-3.5-turbo"

    response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "You are a friendly and helpful assistant. You should be give as much advice as possible, but prioritize specific tips"},
        {"role": "user", "content": "How should I prepare for CS61A if I want to get an A?"}
        ],
    temperature=0.7,
    max_tokens=1000
    # context = context # This is the context string we will be putting into our model
    )
    print(response.choices[0].message.content)
generate_text()
    



