import openai
from dotenv import load_dotenv
import pymongo
import csv
import certifi
import os

def query_data(course_name):
    load_dotenv()
    mongoPW = os.getenv('MONGO_PW')
    client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())

    db = client['classes']
    cs = db['cs']
    course = cs.find_one({"Course Name": course_name})
    return course


def generate_text(course): # may change what type context is (List of Strings) or just string
    load_dotenv()
    client = openai.OpenAI(api_key=os.environ.get("OPEN_AI_KEY"))
    MODEL = "gpt-3.5-turbo"

    course_info = query_data(course)
    reddit_comments = course_info["reddit text"]

    course_name = "The course is " + course
    course_description = "Course description: " + course_info["description"][1]

    if course_info.get("more info"):
        course_description += "\n Extra course info:" + course_info["more info"]

    if course_info.get("more more info"):
        course_description += "\n Extra course info:" + course_info["more more info"]

    course_comments = ""

    for i in reddit_comments:
        post = reddit_comments[i]
        one_post = post["comments"]
        for j in one_post:
            body = j["body"]
            if body != "[deleted]":
                course_comments = course_comments + "New student comment: " + body + "\n"

    course_comments = course_comments[0:5000]


    response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "You are a friendly, helpful, and positive course scheduling assistant. You prioritize specific tips tailored to each class and advise students on how they can succeed in given courses."},
        {"role": "user", "content": "Provide advice for a student considering taking the following class based on the following student comments and course description, focusing on advice for related to the specified class"},
        {"role": "user", "content": course},
        {"role": "user", "content": course_description},
        {"role": "user", "content": course_comments},
        {"role": "user", "content": "At the start, have a section on general thoughts from students, how to succeed in the course (be very specific in this section), and a smaller section focusing on the usefulness of the course, mentioning potential future courses (without making any assumptions)"}
        ],
    temperature=0.7,
    max_tokens=1000
    )
    print(response.choices[0].message.content)

generate_text("COMPSCI61A")
    



