pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS_ID = 'soumayaabderahmen' // Remplacez par l'ID de vos credentials Docker
        MYSQL_DATABASE = 'ironbyte'
        MYSQL_ROOT_PASSWORD = 'root'
        MYSQL_HOST = 'mysqldb'
        MYSQL_USER = 'root'
        MYSQL_PASSWORD = 'root'
        DOCKERHUB_NAMESPACE = 'soumayaabderahmen'
        GITHUB_CREDENTIALS_ID = 'Soumaya' // Remplacez par l'ID de vos credentials GitHub
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
        
        stage('Push Docker Images') {
            steps {
                script {
                    echo "Pushing Docker images to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: 'soumayaabderahmen', usernameVariable: 'dockerHubUser', passwordVariable: 'dockerHubPassword')]) {
                        sh 'echo $dockerHubPassword | docker login -u $dockerHubUser --password-stdin'
                        // Build and push Docker images using Docker Compose
                        sh 'docker-compose -f docker-compose.yml build'
                        sh 'docker-compose -f docker-compose.yml push'
                    }
                }
            }
        }
        
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "Deploying application using Docker Compose..."
                    // Ensure any potential conflicts are cleared
                    sh 'docker-compose -f docker-compose.yml down'
                    // Start new containers
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                    // Debug steps to show the status of the Docker containers
                    sh 'docker-compose ps'
                    sh 'docker ps -a'
                   
                }
            }
        }
        
        stage('Deploy to K8s') {
            steps {
                script {
                    echo "Deploying application to Minikube..."
                    sh 'kubectl apply -f ironbyteintern/backend-deployment.yaml -n jenkins'
                    sh 'kubectl apply -f ironbyteintern/mysql-configMap.yaml -n jenkins'
                    sh 'kubectl apply -f ironbyteintern/mysql-secrets.yaml -n jenkins'
                    sh 'kubectl apply -f ironbyteintern/db-deployment.yaml -n jenkins'
                    sh 'kubectl apply -f ironbyte/frontend-deployment.yaml -n jenkins'
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed."
            sh 'docker-compose ps'  // Debug step to show the status of the Docker containers
            sh 'docker ps -a'  // Debug step to list all Docker containers
        }
        success {
            echo "Pipeline succeeded."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}