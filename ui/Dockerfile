FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run build

# Serve the app
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

