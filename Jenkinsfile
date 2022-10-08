pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git credentialsId: 'ce02e462-2d72-4f92-a2ac-2fce65442e18', url: 'https://github.com/Valiantsin2021/AT_JS_HT2_Valiantsin_Lutchanka.git'            
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
        stage('Publish HTML report') {
            steps {
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'newman', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
            }
        }
    }
}