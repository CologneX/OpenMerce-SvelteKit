# # Use Node.js 16.x as the base image
# FROM node:16-alpine AS build

# # Set the working directory
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install the dependencies
# RUN npm ci

# # Copy the rest of the application files
# COPY . .

# # Build the application
# RUN npm run build

# # Use Nginx as the base image for the production container
# FROM nginx:alpine

# # Remove the default Nginx configuration file
# RUN rm -rf /etc/nginx/conf.d/default.conf

# # Copy the SvelteKit application files to the Nginx container
# COPY --chown=nginx:nginx --from=build /app/build /usr/share/nginx/html

# # Copy the custom Nginx configuration file to the container
# COPY nginx.conf /etc/nginx/conf.d

# # Expose port 80 to the outside world
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


### Build Step
# pull the Node.js Docker image
FROM node:alpine as builder
# change working directory
WORKDIR /usr/src/app
# copy the package.json files from local machine to the workdir in container
COPY package*.json ./
# run npm install in our local machine
RUN npm ci
# copy the generated modules and all other files to the container
COPY . .
# build the application
RUN npm run build
### Serve Step
# pull the Node.js Docker image
FROM node:16.2.0-alpine3.13
# change working directory
WORKDIR /app
# copy files from previous step
COPY --from=builder /usr/src/build .
COPY --from=builder /usr/src/package.json .
COPY --from=builder /usr/src/node_modules ./node_modules
# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000
# the command that starts our app
CMD ["node", "index.js"]