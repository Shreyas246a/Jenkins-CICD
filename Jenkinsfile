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
                 --prettyPrint
                 --nvdApiKey fff36f39-5d8c-42bd-a8c9-7ddd807c8c46''',odcInstallation: 'OWASP-DEPCHECK-10'
            }

        }

            }

        }
   

    }

}