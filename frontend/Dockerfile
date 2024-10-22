# Frontend Dockerfile

# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npx", "serve", "-s", "build"]  
