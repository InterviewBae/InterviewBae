from selenium import webdriver
import time
import os
import json

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
problemsLink = driver.find_element_by_partial_link_text("Problems")
problemsLink.click()
time.sleep(5)
linkBodies = driver.find_elements_by_xpath('//tbody[@class="reactable-data"]/tr')
links = []
for x in linkBodies:
    links.append(x.find_element_by_tag_name('a').get_attribute("href"))
print(links)
questions = {}

i = 0
for link in links:
    driver.get(link)
    time.sleep(10)
    questionDivs = driver.find_elements_by_xpath("//div[@class='description__PY_Q']/div")
    questionTitle = questionDivs[0].find_element_by_id('question-title').text
    temp = questionDivs[0].text.split()
    questionDiff = temp[-5]
    questionContent = questionDivs[1].text
    questionHints = []
    if len(questionDivs)>8:
        for x in range(8, len(questionDivs)):
            questionDivs[x].click()
            time.sleep(2)
            questionHints.append(questionDivs[x].text)
    question = {}
    question["Title"] = questionTitle
    question["Content"] = questionContent
    question["Difficulty"] = questionDiff
    question["Hints"] = questionHints
    questions[i]=question
    i+=1

with open('result.json', 'w') as fp:
    json.dump(questions, fp)
    
driver.close()