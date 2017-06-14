FROM node

WORKDIR /app

# Install top dependencies w/ caching
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn

COPY . /app

ENV NODE_ENV=production
EXPOSE 8080

CMD ["npm", "start"]
