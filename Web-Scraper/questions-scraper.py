from selenium import webdriver
import time
import os

username = os.environ.get("LEETCODE_USERNAME")
password = os.environ.get("LEETCODE_PASSWORD")

driver = webdriver.Chrome()

driver.get('https://leetcode.com')
time.sleep(5)
signInButton = driver.find_element_by_partial_link_text("Sign in")
signInButton.click()
time.sleep(5)
usernameField = driver.find_element_by_id("username-input")
usernameField.send_keys(username)
passwordField = driver.find_element_by_id("password-input")
passwordField.send_keys(password)
signInButton = driver.find_element_by_id("sign-in-button")
signInButton.click()
time.sleep(5)


driver.close()