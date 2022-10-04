pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git 'https://github.com/Valiantsin2021/AT_JS_HT2_Valiantsin_Lutchanka.git'            
                }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Run API tests') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm test'
            }
        }
        stage('Archive artefacts') {
            steps {
                archiveArtifacts artifacts: "newman/*.xml", followSymlinks: false
            }
        }
    }
}