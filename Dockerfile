
FROM node:21-alpine
COPY . .
RUN npm install --save-dev
CMD ["npm", "run", "start"]
EXPOSE 3000