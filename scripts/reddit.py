import praw
from dotenv import load_dotenv
import pymongo
import os
import re
import certifi
import csv

COURSE_LIST = ['COMPSCI10', 'COMPSCI47B', 'COMPSCI61A', 'COMPSCI61B', 'COMPSCI61C', 'COMPSCI70', 'COMPSCI161',
             'COMPSCI162', 'COMPSCI168', 'COMPSCI184', 'COMPSCI186', 'COMPSCI70', 'COMPSCI182', 'COMPSCI189', 'COMPSCI188', 'COMPSCI191']


def modifyString(course):
    match = re.match(r"COMPSCI(\d+)([a-zA-Z]*)", course, re.I)
    if match:
        number, suffix = match.groups()
        # Create search terms with and without space
        return f"cs {number}{suffix}"

def getCourseData(course):
    load_dotenv()
    CLIENT_ID = os.getenv('REDDIT_CLIENT_ID')
    SECRET = os.getenv('REDDIT_CLIENT_SECRET')

    reddit = praw.Reddit(
        client_id=CLIENT_ID,
        client_secret=SECRET,
        user_agent='Script, Comfortable_Yak_5855'
    )

    subreddit = reddit.subreddit("berkeley")

    seen_post_ids = set()
    course_data = {}
    max_posts = 20

    # Define additional search terms
    additional_terms = ['tips', 'advice']
    
    # Generate search queries
    search_queries = [f"{modifyString(course)} {term}" for term in additional_terms]
    print(f"Search queries: {search_queries}")

    for query in search_queries:
        for submission in subreddit.search(query, sort="relevance", limit=max_posts):
            if submission.id not in seen_post_ids and len(seen_post_ids) < max_posts:
                seen_post_ids.add(submission.id)
                
                # Store the post data
                post_data = {
                    "title": submission.title,
                    "reddit_url": submission.url,
                    "comments": []
                }

                # Fetching comments
                submission.comments.replace_more(limit=0)  # limit to fewer comments
                for comment in submission.comments.list():
                    post_data["comments"].append({
                        "author": str(comment.author),
                        "body": comment.body
                    })

                course_data[submission.id] = post_data
    
    if len(course_data) < 20:
        for submission in subreddit.search(modifyString(course), sort="relevance", limit=10):
            if submission.id not in seen_post_ids and len(seen_post_ids) < max_posts:
                seen_post_ids.add(submission.id)
                
                # Store the post data
                post_data = {
                    "title": submission.title,
                    "reddit_url": submission.url,
                    "comments": []
                }

                # Fetching comments
                submission.comments.replace_more(limit=0)  # limit to fewer comments
                for comment in submission.comments.list():
                    post_data["comments"].append({
                        "author": str(comment.author),
                        "body": comment.body
                    })

                course_data[submission.id] = post_data

    return course_data


def updateDocs(Course_name, reddit_text):
    load_dotenv()
    mongoPW = os.getenv('MONGO_PW')
    client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())

    db = client['classes']
    cs = db['cs']

    cs.update_one(
        { "Course Name": Course_name},
        { "$set": {'reddit text': reddit_text}}
    )


def export_to_csv(course_data, filename="course_data.csv"):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        csv_writer = csv.writer(file)

        # Write the header row
        csv_writer.writerow(['Post ID', 'Post Title', 'Post URL', 'Comment Author', 'Comment Body'])

        for post_id, post_info in course_data.items():
            # Write post info once
            csv_writer.writerow([post_id, post_info['title'], post_info['reddit_url']])

            # Write comments for the post
            for comment in post_info['comments']:
                csv_writer.writerow([comment['author'], comment['body']])


search_term = 'COMPSCI47B'


print(getCourseData(search_term))

# export_to_csv(getCourseData(search_term))

# updateDocs(search_term, getCourseData(search_term))

