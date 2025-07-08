# Use official Node.js 22.14 image
FROM node:22.14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
