FROM node:18
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /srv/
COPY ./package.json ./
COPY ./package-lock.json ./
ENV PATH /srv/node_modules/.bin:$PATH
RUN npm config set network-timeout 600000 -g
RUN npm install
WORKDIR /srv/app
COPY ./ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "develop"]
