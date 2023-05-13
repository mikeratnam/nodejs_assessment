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
        PATH = "${env.PATH};C:\\Users\\imagi\\.kube"
      }
      steps {
        script {
          if (isUnix()) {
            sh 'nohup kubectl --kubeconfig=$KUBECONFIG apply -f ./kubernetes/deployment.yaml &'
            sh 'nohup kubectl --kubeconfig=$KUBECONFIG apply -f ./kubernetes/service.yaml &'
          } else {
            echo "Skipping 'nohup' commands on Windows."
            bat "kubectl --kubeconfig \"${env.KUBECONFIG}\" apply -f C:/Users/imagi/.jenkins/workspace/nodejs_on_pod/deployment.yaml"
            bat "kubectl --kubeconfig \"${env.KUBECONFIG}\" apply -f C:/Users/imagi/.jenkins/workspace/nodejs_on_pod/service.yaml"
          }
        }
      }
    }
  }
}
