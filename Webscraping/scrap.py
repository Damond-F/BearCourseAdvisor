from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
import pandas as pd

driver = webdriver.Chrome()
driver.get('https://hoopshype.com/salaries/players/')
