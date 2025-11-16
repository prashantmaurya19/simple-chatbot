FROM node:22-alpine3.21

WORKDIR /app

RUN corepack enable

COPY ./backend/ .

RUN yarn install --immutable

CMD ["yarn","start"]



