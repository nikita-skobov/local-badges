pipeline {
  agent any

  environment {
    BUILD_RES = "${currentBuild.result}"
  }

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
      echo "${BUILD_RES}"
      echo "current pipeline result: ${currentBuild.currentResult}"
      echo "Pipeline result: ${currentBuild.result}"
      sh 'npm run badges --coverage-path coverage/clover.xml --build-status "${currentBuild.currentResult}""'
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