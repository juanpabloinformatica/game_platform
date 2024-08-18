# Définir une variable d'argument pour spécifier la version de Node.js à utiliser
ARG NODE_VERSION=18.20.4-slim

# Utiliser l'image Node.js spécifiée par la variable d'argument
FROM node:$NODE_VERSION AS builder
ARG NPM_ARGS
ENV NPM_ARGS=${NPM_ARGS}

# Create user, http://redhatgov.io/workshops/security_containers/exercise1.2/
# Créer un nouvel utilisateur et un nouveau groupe pour exécuter notre application
# C'est une bonne pratique pour la sécurité, car cela évite d'exécuter l'application en tant que root
RUN groupadd -r nodejs -g 433 && \
    useradd -u 431 -r -g nodejs -s /sbin/nologin -c "Docker image user" nodejs

# Créer un répertoire pour l'application et on change la propriété de ce répertoire à notre nouvel utilisateur
RUN mkdir /home/nodejs && \
    chown -R nodejs:nodejs /home/nodejs

# Changer l'utilisateur courant à notre nouvel utilisateur
USER nodejs

# Créer et définir un répertoire pour l'application
WORKDIR /home/nodejs

# Copier le package.json et le package-lock-json
COPY --chown=nodejs:nodejs ./auth/package*.json ./

# Installer les dépendances
RUN npm install --only=production

# Copier le reste du code de l'application
COPY --chown=nodejs:nodejs ./auth/ .
# Adding docker ok option
RUN sed -i 's/false/true/g' ./src/variables.ts
# Construire l'application
RUN npm run build

# Créer une nouvelle image à partir de l'image de base Node.js
FROM node:$NODE_VERSION

WORKDIR /home/nodejs

# Copier les dépendances et le code construit depuis l'image builder
COPY --from=builder --chown=nodejs:nodejs /home/nodejs/ .

# Exposer le port sur lequel l'application va s'exécuter
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["npm", "start"]
