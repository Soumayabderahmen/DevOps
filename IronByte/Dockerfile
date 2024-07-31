# Utilisez une image de base Node.js pour la construction
FROM node:20-alpine AS build

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le contenu du projet
COPY . .

# Construisez l'application Angular
RUN npm run build --prod

# Utilisez une image de base Nginx pour le serveur
FROM nginx:alpine

# Copiez les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist/iron-byte /usr/share/nginx/html
# Copiez les fichiers construits depuis l'étape précédente

# Copiez le fichier de configuration Nginx personnalisé
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf.d/default.conf
# Exposez le port sur lequel l'application Angular sera accessible
EXPOSE 80

# Démarrez Nginx
CMD ["nginx", "-g", "daemon off;"]
