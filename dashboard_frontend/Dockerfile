# Use an official Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]