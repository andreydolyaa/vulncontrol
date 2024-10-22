FROM node:18

# Install Docker
RUN apt-get update && \
    apt-get -qy full-upgrade && \
    apt-get install -qy curl && \
    apt-get install -qy curl && \
    curl -sSL https://get.docker.com/ | sh

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the app
COPY . .

# Give access to the Docker socket
VOLUME /var/run/docker.sock:/var/run/docker.sock

EXPOSE 3000

CMD ["node", "index.js"]
