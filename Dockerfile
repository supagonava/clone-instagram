#1st Stage
FROM node:18 AS builder

WORKDIR /ttm/frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

#2nd Stage
FROM nginx:1.22.1-alpine

COPY --from=0 /ttm/frontend/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g","daemon off;"]

