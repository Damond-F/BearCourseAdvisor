from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
import pandas as pd

driver = webdriver.Chrome()
driver.get('https://guide.berkeley.edu/courses/compsci/')



code_element = driver.find_element("By.CSS_SELECTOR", "span.code")



"""links = driver.find_elements("xpath", "//a[@href]") 
for link in links:
    print(link.get_attribute('innerHTML'))"""

#driver.find_element("xpath", '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input')


