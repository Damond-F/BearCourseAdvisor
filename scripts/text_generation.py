import openai
from dotenv import load_dotenv
import pymongo
import csv
import os


def query_data(course):
    load_dotenv()
    mongoConnection = os.getenv('MONGO_CONNECTION')
    client = pymongo.MongoClient(mongoConnection)

def generate_text(context):
    load_dotenv()
    client = openai.OpenAI(api_key=os.environ.get("OPEN_AI_KEY"))
    MODEL = "gpt-3.5-turbo"

    response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Knock knock."},
        {"role": "assistant", "content": "Who's there?"},
        {"role": "user", "content": "Orange."},
        ],
    temperature=0.7,
    max_tokens=1000
    context = context # This is the context string we will be putting into our model
    )
    print(response.choices[0].message.content)
generate_text()
    



