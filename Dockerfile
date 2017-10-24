FROM node:8.7.0-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY /app /app
EXPOSE 8080
CMD ["npm", "run", "server"]
