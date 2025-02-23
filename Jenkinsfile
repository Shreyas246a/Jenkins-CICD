pipeline{
agent any
tools{
    nodejs 'nodejs-23.8.0'
    
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
                 --prettyPrint''',odcInstallation: 'OWASP-DEPCHECK-10'
            }

        }

            }

        }
   

    }

}