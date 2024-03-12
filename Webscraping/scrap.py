from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import pandas as pd

driver = webdriver.Chrome()
driver.get('https://guide.berkeley.edu/courses/compsci/')

from selenium.webdriver.support import expected_conditions as EC

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

print(courses_info)

#print(filtered_courses_description)




#code_element = driver.find_element(By.CSS_SELECTOR, "span.code")
#print(code_element.text)



"""links = driver.find_elements("xpath", "//a[@href]") 
for link in links:
    print(link.get_attribute('innerHTML'))"""

#driver.find_element("xpath", '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input')


