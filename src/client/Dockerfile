# Base image
FROM node:latest as builder

# Set the working directory
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the app code
COPY . .

# Build the app with Webpack
RUN yarn run build

# Create a new stage to run the app
FROM nginx:alpine

# Copy the built app files to the new stage
COPY --from=builder /dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

# Expose the port that the app will listen on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
