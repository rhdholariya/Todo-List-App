# frontend/Dockerfile

# Build stage
FROM node:20.12.0 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app (or the application that generates the dist folder)
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /etc/nginx/html

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
