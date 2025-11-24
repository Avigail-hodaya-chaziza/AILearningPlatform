

# שלב Build
FROM "react": "^19.1.1"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm start

# שלב Serve
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
