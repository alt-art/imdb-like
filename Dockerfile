FROM node:18.13-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn prisma generate

RUN yarn build

CMD ["yarn", "start:prod"]
