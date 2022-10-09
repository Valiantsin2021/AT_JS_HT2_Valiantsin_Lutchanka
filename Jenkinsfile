pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'Cypress', credentialsId: 'ce02e462-2d72-4f92-a2ac-2fce65442e18', url: 'https://github.com/Valiantsin2021/AT_JS_HT2_Valiantsin_Lutchanka'
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
