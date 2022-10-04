# JS automation tests using Postman and Cypress

## This repository purpose is to perform API positive and negative test automation of DropBox upload and delete file features https://www.dropbox.com/

## The test suites purpose is to perform the following assertions:

##### 1. Retrieve the OAuth 2.0 token for authorizing API requests
##### 2. Upload the test text file (text.txt) on the Dropbox and check it is uploaded successfully
##### 3. Check the uploaded file Metadata is correct
##### 4. Delete the uploaded file (text.txt) and check it is deleted successfully
##### 5. Perform negative tests for upload, search and delete requests with assertions on wrong endpoints and wrong body/headers data

## Job done:
    
### Postman

1.  Environment with variables and constants
2.  Positive and Negative test suites
3.  Html and junit reporters
4.  Jenkinsfile
5.  Github Actions yml file
6.  Html report publish on gh-pages

### Cypress

1. Environment variables for tokens and keys
2. Positive and negative test suites
3. Constants in a separate file
4. Mochawesome report
5. Github Actions yml file
6. Jenkiinsfile

## Setup:

### For Postman tests

1. Clone master branch of this repository
2. Navigate to the folder of cloned repository and run terminal 
3. Install dependencies with "npm install"
4. To run tests - "npm test"

### for Cypress tests

1. Clone Cypress branch of this repository
2. Navigate to the folder of cloned repository and run terminal 
3. Install dependencies with  "npm install"
4. To run tests - "npm test"