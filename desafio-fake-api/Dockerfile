FROM node:alpine

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npx",  "json-server", "db.json", "--host", "0.0.0.0"]