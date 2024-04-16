from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import pandas as pd
import os
import requests
import pymongo
from dotenv import load_dotenv
import certifi

driver = webdriver.Chrome()
driver.get('https://guide.berkeley.edu/courses/compsci/')

from selenium.webdriver.support import expected_conditions as EC

def get_courses():
# Define the maximum time to wait for the elements to appear (in seconds)
    wait_time_out = 10

    # Find all the elements with the class 'code' that are inside 'span' elements
    WebDriverWait(driver, wait_time_out).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.code"))
    )
    code_elements = driver.find_elements(By.CSS_SELECTOR, "span.code")

    course_blocks = driver.find_elements(By.CSS_SELECTOR, ".courseblock")


    # Extract the text content from each of the 'code' elements
    #course_codes = [element.text for element in code_elements]
    course_codes = []

    for element in code_elements:
        course_code_with_space = element.text
        course_code_without_space = course_code_with_space.replace(" ", "")
        #print(course_code_without_space)
        course_codes.append(course_code_without_space)

    grad_boundary = course_codes.index('COMPSCIC200A')

    filtered_course_codes = [course_codes[:grad_boundary]][0]
    #print(filtered_course_codes)

    WebDriverWait(driver, wait_time_out).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".btn_toggleCoursebody"))
    )
    toggle_buttons = driver.find_elements(By.CSS_SELECTOR, ".btn_toggleCoursebody")

    # Click each toggle button to expand the course description
    for button in toggle_buttons:
        driver.execute_script("arguments[0].click();", button)

    # Wait for the course descriptions to be visible
    WebDriverWait(driver, wait_time_out).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.coursebody"))
    )

    courses_info = {}

    courses_description = []
    for block in course_blocks:
        desc_element = block.find_element(By.CSS_SELECTOR, "p") 
        course_desc = desc_element.text #Description text
        #print(course_desc)
        courses_description.append(course_desc)

    filtered_courses_description = [courses_description[:grad_boundary]]

    #print(filtered_course_codes)

    for i in range(len(filtered_course_codes)): #Assigns course code to course description in hash table
        courses_info[filtered_course_codes[i]] = courses_description[i]
    
    return courses_info 

course_info = get_courses()

keys_to_keep = [
    "COMPSCI10", "COMPSCI47B", "COMPSCI61A", "COMPSCI61B", "COMPSCI61C",
    "COMPSCI70", "COMPSCI161", "COMPSCI162", "COMPSCI168", "COMPSCI184",
    "COMPSCI186", "COMPSCI182", "COMPSCI189", "COMPSCI188", "COMPSCI191"
]


filtered_course_info = {k: course_info[k] for k in keys_to_keep if k in course_info}
#print(filtered_course_info) #This is dictinary - (Key = Course Code, Value = Course Description)

def clean_descriptions(courses):
    updated_course_descriptions = courses.copy()

    for course, description in updated_course_descriptions.items():
        # Split the description at the newline character and take the first part
        updated_course_descriptions[course] = description.split('\n')[:2]
    
    return updated_course_descriptions

filtered_course_info = clean_descriptions(filtered_course_info)
#print(filtered_course_info.items())

def import_to_db(courses):
    load_dotenv()
    mongoPW = os.getenv('MONGO_PW')
    client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())    
    db = client['classes']
    cs = db['cs']

    for course_code, course_description in courses.items():
        # Assume that the 'course_code' is a unique identifier for the courses in the collection.
        # The update is made to a new field called 'description'.
        cs.update_one(
            {"Course Name": course_code}, 
            {"$set": {"description": course_description}}
        )

import_to_db(filtered_course_info)
#print(filtered_courses_description)




#code_element = driver.find_element(By.CSS_SELECTOR, "span.code")
#print(code_element.text)



"""links = driver.find_elements("xpath", "//a[@href]") 
for link in links:
    print(link.get_attribute('innerHTML'))"""

#driver.find_element("xpath", '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input')


