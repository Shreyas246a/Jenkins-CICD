pipeline {
agent any
tools{
    nodejs 'nodejs-23.8.0'  
      }
environment {
  MONGO_URI = "mongodb+srv://cluster0.1jprpwp.mongodb.net/superdata"
  MONGO_USERNAME=credentials('mongo-db-username')
  MONGO_PASSWORD=credentials('monogo-db-password')
  SONARQUBE_SCANNER_HOME = tool 'sonarqube-scanner-610'
}
options {
  disableConcurrentBuilds abortPrevious: true
}
stages{
        stage('Installing dependencies'){
            steps{
                sh 'npm install --no-audit'
            }
           }
        
        stage("Dependency Scanning"){
            parallel{
           stage('Dependency Audit'){
            steps{
                sh ''' 
                npm audit --audit-level=critical
                echo $?
                '''
            }
            } 
                stage("OWASP dependency Check"){
            steps{
            dependencyCheck additionalArguments: ''' 
            --scan \'./\'
            --out \'./\'
                 --format \'ALL\'
                 --prettyPrint
                 --nvdApiKey fff36f39-5d8c-42bd-a8c9-7ddd807c8c46''',odcInstallation: 'OWASP-DEPCHECK-10'
  
                 dependencyCheckPublisher failedTotalCritical: 1, failedTotalHigh: 2, failedTotalLow: 90, failedTotalMedium: 4, pattern: 'dependency-check-report.xml', stopBuild: true
                
                    }

                 }

                    }

              }
        stage("Unit testing"){
            steps{
                     sh 'echo $MONGO_USERNAME'
                     sh 'echo $MONGO_PASSWORD'
                     sh 'npm test'
                }
             }
        
        stage("Code Coverage"){
            steps{ 
                    catchError(buildResult: 'SUCCESS', message: 'Fixing in future', stageResult: 'UNSTABLE') {
                                             sh 'npm run coverage'
                    }

                    }

            }
        stage('SonarQube Scanning'){
            steps{
            sh '$SONARQUBE_SCANNER_HOME'
            sh ''' 
            $SONARQUBE_SCANNER_HOME/bin/sonar-scanner \
            -Dsonar.projectKey=Solar-system-project \
            -Dsonar.sources=app.js \
            -Dsonar.host.url=http://localhost:9000 \
            -Dsonar.token=sqp_11d1cc900107067e3eaf02ea198ecfb6d2328b60
            '''
            }
            }

        }

post {
  always {

    junit allowEmptyResults: true, keepProperties: true, stdioRetention: 'ALL', testResults: 'test-results.xml'
    junit allowEmptyResults: true, keepProperties: true, stdioRetention: 'ALL', testResults: 'dependency-check-junit.xml'
    publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency HTML Report', reportTitles: '', useWrapperFileDirectly: true])
    publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code coverage HTML Report', reportTitles: '', useWrapperFileDirectly: true])


  }
}
   

    }
