import praw
from dotenv import load_dotenv
import os
import re
import csv


def modifyString(course):
    match = re.match(r"COMPSCI(\d+)([a-zA-Z]*)", course, re.I)
    if match:
        number, suffix = match.groups()
        # Create search terms with and without space
        search_terms = [f"cs{number}{suffix}", f"cs {number}{suffix}"]
        return search_terms
    else:
        # Return an empty list if the format doesn't match expected pattern
        return []

def getCourseData(course):
    load_dotenv()
    CLIENT_ID = os.getenv('REDDIT_CLIENT_ID')
    SECRET = os.getenv('REDDIT_CLIENT_SECRET')

    reddit = praw.Reddit(
        client_id = CLIENT_ID,
        client_secret = SECRET,
        user_agent = 'Script, Comfortable_Yak_5855'
    )

    subreddit = reddit.subreddit("berkeley")

    seen_post_ids = set()
    course_data = {}

    search_queries = modifyString(course)

    for query in search_queries:
        for submission in subreddit.search(query, sort="relevance", limit=5):
            if submission.id not in seen_post_ids:
                seen_post_ids.add(submission.id)
                
                # Store the post data
                post_data = {
                    "title": submission.title,
                    "url": submission.url,
                    "comments": []
                }

                # Fetching comments
                submission.comments.replace_more(limit=None)
                for comment in submission.comments.list():
                    post_data["comments"].append({
                        "author": str(comment.author),
                        "body": comment.body
                    })

                course_data[submission.id] = post_data

    '''
    Structure:

    "submission_id_1": {
        "title": "Post Title 1",
        "url": "https://reddit.com/post1",
        "comments": [
            {"author": "user1", "body": "Comment text 1"},
            {"author": "user2", "body": "Comment text 2"},
            // ... more comments
        ]
    },
    "submission_id_2": {
        "title": "Post Title 2",
        "url": "https://reddit.com/post2",
        "comments": [
            {"author": "user3", "body": "Comment text 3"},
            {"author": "user4", "body": "Comment text 4"},
            // ... more comments
        ]
    },
    '''



    return course_data


def export_to_csv(course_data, filename="course_data.csv"):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        csv_writer = csv.writer(file)

        # Write the header row
        csv_writer.writerow(['Post ID', 'Post Title', 'Post URL', 'Comment Author', 'Comment Body'])

        for post_id, post_info in course_data.items():
            # Write post info once
            csv_writer.writerow([post_id, post_info['title'], post_info['url']])

            # Write comments for the post
            for comment in post_info['comments']:
                csv_writer.writerow([comment['author'], comment['body']])



export_to_csv(getCourseData('COMPSCI161'))