# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Install a global serve tool to serve the production build
RUN npm install -g serve

# Step 8: Expose the port on which the app will run
EXPOSE 2009

# Step 9: Use the "serve" command to serve the built app in production mode
CMD ["serve", "-s", "build", "-l", "2009"]
