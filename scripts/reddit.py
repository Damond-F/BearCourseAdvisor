import praw
from dotenv import load_dotenv
import os
import re
import pandas as pd
import time

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

    search_queries = modifyString(course)

    for query in search_queries:
        for submission in subreddit.search(query, sort="relevance", limit=25):
            if submission.id not in seen_post_ids:
                seen_post_ids.add(submission.id)
                print(f"Post Title: {submission.title}\nPost URL: {submission.url}\n")
                
                submission.comments.replace_more(limit=None)
                for comment in submission.comments.list():
                    print(f"\tComment by {comment.author}: {comment.body}\n")

getCourseData('COMPSCI61A')