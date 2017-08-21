FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules.bin:$PATH

# install and chache appd ependencies

ADD package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@0.9.5 -g --silent

# add app
ADD . /usr/src/app

# start app
CMD ["npm", "start"]
