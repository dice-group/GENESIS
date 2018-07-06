FROM node

WORKDIR /app

# Install top dependencies w/ caching
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --silent

# copy files
COPY . /app

# build
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
