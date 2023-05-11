pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        git 'https://github.com/mikeratnam/nodejs_assessment.git'
        script {
          def dockerImage = docker.build('rathub/sampleone')
          docker.withRegistry('https://registry.hub.docker.com', 'docker-registry-credentials') {
            dockerImage.push()
          }
        }
      }
    }

    stage('Deploy') {
      environment {
        KUBECONFIG = credentials('kubeconfig-creds')
      }
      steps {
        script {
          if (isUnix()) {
            sh 'nohup kubectl --kubeconfig=$KUBECONFIG apply -f ./kubernetes/deployment.yaml &'
            sh 'nohup kubectl --kubeconfig=$KUBECONFIG apply -f ./kubernetes/service.yaml &'
          } else {
            echo "Skipping 'nohup' commands on Windows."
            bat 'kubectl --kubeconfig=%KUBECONFIG% apply -f ./kubernetes/deployment.yaml'
            bat 'kubectl --kubeconfig=%KUBECONFIG% apply -f ./kubernetes/service.yaml'
          }
        }
      }
    }
  }
}
