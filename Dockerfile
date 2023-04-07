FROM node:16-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /variaMosRestrictionsService

# copy configs to /variaMosRestrictionsService folder
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

# copy source code to /variaMosRestrictionsService/src folder
COPY ./ . 

# # check files list
# RUN ls -a

#RUN npm install
# RUN npm install -g ts-node
RUN npm run build

EXPOSE 4003

CMD [ "npm", "start" ]
