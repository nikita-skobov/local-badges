pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm install'
        sh 'npm run test-CI'
      }
    }
  }

  post {
    always {
      echo "Pipeline result: ${currentBuild.result}"
      sh "npm run badges -- --coverage-path coverage/clover.xml --build-status ${currentBuild.result}"
    }
    success {
      echo 'Nice!!!'
    }
    unstable {
      echo 'Are we unstable?? why?'
    }
    failure {
      echo 'Im a failure :('
    }
  }
}