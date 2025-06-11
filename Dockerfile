FROM node:24

WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install
RUN cd backend && npx prisma generate

EXPOSE 5173 3000

CMD ["npm", "start"]
