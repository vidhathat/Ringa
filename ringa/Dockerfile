# Fetching the latest node image on apline linux
FROM node as build

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /ringav1

# Installing dependencies
COPY package.json .
RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 3000
# Starting our application
CMD ["npm", "start"]