# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
