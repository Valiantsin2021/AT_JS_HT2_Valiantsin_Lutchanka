# JS automation API tests using Postman and Cypress

## This repository purpose is to perform API positive and negative test automation of DropBox upload, check metadata and delete file features https://www.dropbox.com/

## Report page https://valiantsin2021.github.io/AT_JS_HT2_Valiantsin_Lutchanka/

The Dropbox account under the test is created for the testing purposes only and is not a private or personal. Authorization credentials provided in tests are for learning purposes only and to provide the possibility to check the automation task accomplishment.

## Technology used

- Postman (Newman)
- Cypress 

## The test suites purpose is to perform the following scenarios:

##### 1. Retrieve the OAuth 2.0 token for authorizing API requests and check user and app authorization
##### 2. Upload the test text file (text.txt) on the Dropbox and check if it is uploaded successfully
##### 3. Check if the uploaded file Metadata is correct
##### 4. Delete the uploaded file (text.txt) and check if it is deleted successfully
##### 5. Perform negative tests for upload, search and delete requests with assertions on wrong endpoints and wrong body/headers data

## Job done:
    
### Postman

1.  Environment with variables and constants
2.  Positive and Negative test suites
3.  Html and junit reporters
4.  Jenkinsfile
5.  Github Actions yml file
6.  Html report publish on gh-pages
7.  Response json schema validation for upload, check metadata and delete file scenarios.
8.  Pre-request scripts for shared tests for various test cases to save in environmental variables
9.  Add Jenkins_local_host_log with job results on the local machine

### Cypress

1. Environment variables for tokens and keys
2. Positive and negative test suites
3. Constants in a separate file
4. Mochawesome report
5. Github Actions yml file
6. Jenkiinsfile
7. Response json schema validation for upload, check metadata and delete file scenarios.

## Setup:

### For Postman tests

1. Clone master branch of this repository
2. Navigate to the folder of cloned repository and run terminal 
3. Install dependencies with "npm install"
4. To run tests - "npm test"

### For Cypress tests

1. Clone Cypress branch of this repository
2. Navigate to the folder of cloned repository and run terminal 
3. Install dependencies with  "npm install"
4. To run tests - "npm test"

### To run tests natively in Postman 

1. Import to your Postman workspace the Dropbox-API-upload-download-tests.postman_collection.json and Dropbox.postman_environment.json files from the master branch and run the collection with the corresponding environment