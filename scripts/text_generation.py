import openai
from dotenv import load_dotenv
import pymongo
import csv
import os

def query_data(course_name):
    load_dotenv()
    mongoConnection = os.getenv('MONGO_CONNECTION')
    client = pymongo.MongoClient(mongoConnection)

    db = client['classes']
    cs = db['cs']
    courseCursor = cs.find()


    course = courseCursor
    print(course)
    

query_data('COMPSCI10')


def generate_text(course): # may change what type context is (List of Strings) or just string
    load_dotenv()
    client = openai.OpenAI(api_key=os.environ.get("OPEN_AI_KEY"))
    MODEL = "gpt-3.5-turbo"
    comments = query_data(course)

    response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "You are a friendly, helpful, and positive course scheduling assistant. You prioritize specific tips tailored to each class and advise students on how they can succeed in the given course."},
        {"role": "user", "content": "Provide advice for a student considering taking the following class based on the things other students"}
        ],
    temperature=0.7,
    max_tokens=1000
    # context = context # This is the context string we will be putting into our model
    )
    print(response.choices[0].message.content)
    



