# Use the official Node.js image as the base image
FROM node:lts-alpine3.17

# Copy the app source code to the container
WORKDIR /.svelte-kit
COPY . .

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Expose the port that the Node.js server will listen on
EXPOSE 3000

# Start the Node.js server when the container starts
CMD ["npm", "run", "start"]
