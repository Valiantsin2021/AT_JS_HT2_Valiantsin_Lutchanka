pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'Cypress', url: 'https://github.com/Valiantsin2021/AT_JS_HT2_Valiantsin_Lutchanka.git'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm test'
            }
        }
    }
}
