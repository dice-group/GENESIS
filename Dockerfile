FROM node

WORKDIR /app

# Install top dependencies w/ caching
COPY package.json /app/package.json
RUN npm install --silent

COPY . /app

ENV NODE_ENV=production
EXPOSE 8080

CMD ["npm", "start"]
