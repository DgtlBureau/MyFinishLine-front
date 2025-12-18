FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json yarn.lock
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
