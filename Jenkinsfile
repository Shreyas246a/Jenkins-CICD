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

    }

}