pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Checkout source code from Git repository
        git 'https://github.com/mikeratnam/nodejs_assessment.git'

        // Build and push Docker image
        // The image is public on dockerhub and creds are loaded into jenkins
        script {
          def dockerImage = docker.build('rathub/sampleone')
          docker.withRegistry('https://index.docker.io/v1/', 'docker-registry-credentials') {
            dockerImage.push()
          }
        }
      }
    }

    stage('Deploy') {
      // Creds are specified in jenkins
      environment {
        KUBECONFIG = credentials('kubeconfig-creds')
      }
      steps {
        // Deploy to Kubernetes cluster
        sh 'kubectl  --kubeconfig=$KUBECONFIG apply -f ./kubernetes/deployment.yaml'
        sh 'kubectl  --kubeconfig=$KUBECONFIG apply -f ./kubernetes/service.yaml'
      }
    }
  }
}