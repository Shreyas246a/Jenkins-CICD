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
                 --disableYarnAudit \
                 --nvdApiKey fff36f39-5d8c-42bd-a8c9-7ddd807c8c46''',odcInstallation: 'OWASP-DEPCHECK-10'
  
                 dependencyCheckPublisher failedTotalCritical: 1, failedTotalHigh: 2, failedTotalLow: 90, failedTotalMedium: 4, pattern: 'dependency-check-report.xml', stopBuild: true
                
                    }

                 }

                    }

              }
        stage("Unit testing"){
            steps{
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
              timeout(time: 300, unit: 'SECONDS') {
              withSonarQubeEnv('sonar-qube-server') {
            sh ''' 
            $SONARQUBE_SCANNER_HOME/bin/sonar-scanner \
            -Dsonar.projectKey=Solar-system-project \
            -Dsonar.sources=app.js \
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
            '''
            }
            waitForQualityGate abortPipeline: true
              }
            }
            }
        
        stage("Docker Image"){
            steps{
            sh 'printenv'
            sh 'docker build -t shreyas246/solar-system:$GIT_COMMIT .'
            }
            }
        stage("Docker image push"){
          steps{
            withDockerRegistry(credentialsId: 'Docker-Creds', url: "") {
            sh 'docker push shreyas246/solar-system:$GIT_COMMIT'
          }
          }
          }

        stage("AWS Deployment"){
          when {
          expression { env.BRANCH_NAME.startsWith('feature/') }
          }
          steps{
          script { sshagent(['EC2-Key']) {
              sh '''
                ssh -o StrictHostKeyChecking=no ubuntu2@13.201.81.185 << EOF
                if sudo docker ps -a | grep -q "solar-system";then
                echo "Container found. Stopping..."
                  sudo docker stop "solar-system" && sudo docker rm "solar-system"
                echo "Container stopped and removed."
                fi 
                sudo docker run --name solar-system \
                -e MONGO_URI=$MONGO_URI \
                -e MONGO_USERNAME=$MONGO_USERNAME \
                -e MONGO_PASSWORD=$MONGO_PASSWORD \
                -p 3000:3000 -d shreyas246/solar-system:$GIT_COMMIT
                EOF
              '''
              }
              }
              }
              }
          // stage("AWS Integration Testing"){
          //   steps{
          //     withAWS(region: 'ap-south-1',credentials:'aws-s3-ec2-lambda'){
          //         'bash aws-integration-twst.sh'
                
          //       } 
          //     }

          // }
      
      
      


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
