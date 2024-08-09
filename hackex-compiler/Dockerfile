FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node", "app.js"]
EXPOSE 8000
# docker container run -d -p 8000:8000 --name hackex-compiler-container hackex-compiler