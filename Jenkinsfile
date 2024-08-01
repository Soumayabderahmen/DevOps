pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS_ID = 'soumayaabderahmen' // Replace with your Docker credentials ID
        MYSQL_DATABASE = 'ironbyte'
        MYSQL_ROOT_PASSWORD = 'root'
        MYSQL_HOST = 'mysqldb'
        MYSQL_USER = 'root'
        MYSQL_PASSWORD = 'root'
        DOCKERHUB_NAMESPACE = 'soumayaabderahmen'
        GITHUB_CREDENTIALS_ID = 'Soumaya' // Replace with your GitHub credentials ID
          NODEJS_VERSION = 'NodeJS' // Remplacez par le nom de votre outil NodeJS configuré dans Jenkins
    }
    
    tools {
        nodejs "${env.NODEJS_VERSION}" // Utilisation de la version configurée de NodeJS
        maven 'Maven' // Utilisation de la version configurée de Maven
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out the repository..."
                    git url: 'https://github.com/Soumayabderahmen/DevOps.git', branch: 'main', credentialsId: "${env.GITHUB_CREDENTIALS_ID}"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    echo "Building the application..."
                    withMaven(maven: 'Maven') {
                        sh 'mvn clean install -f IronByteIntern/pom.xml'
                    }
                    dir('IronByte') {
                        sh 'npm install --silent'
                        sh 'npm run build --silent'
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images..."
                    sh "docker build -t ${env.DOCKERHUB_NAMESPACE}/ironbyteintern:latest IronByteIntern"
                    sh "docker build -t ${env.DOCKERHUB_NAMESPACE}/ironbyte:latest IronByte"
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    echo "Pushing Docker images to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: "${env.DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        sh "docker push ${env.DOCKERHUB_NAMESPACE}/ironbyteintern:latest"
                        sh "docker push ${env.DOCKERHUB_NAMESPACE}/ironbyte:latest"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo "Deploying application using Docker Compose..."
                sh 'docker-compose -f docker-compose.yml up --build -d'
            }
        }

         stage('Deploy to K8s') {
    steps {
        script {
            echo "Deploying application to Minikube..."
sh 'kubectl config use-context minikube'
sh 'kubectl apply -f IronByteIntern/backend-deployment.yaml -n jenkins --validate=false'
sh 'kubectl apply -f IronByteIntern/mysql-configMap.yaml -n jenkins --validate=false'
sh 'kubectl apply -f IronByteIntern/mysql-secrets.yaml -n jenkins --validate=false'
sh 'kubectl apply -f IronByteIntern/db-deployment.yaml -n jenkins --validate=false'
sh 'kubectl apply -f IronByte/frontend-deployment.yaml -n jenkins --validate=false'
            
        }
    }
}
    }
    
    
    post {
        always {
            echo "Pipeline completed."
        }
        success {
            echo "Pipeline succeeded."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
