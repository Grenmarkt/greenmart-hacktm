FROM node:24

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y iproute2 net-tools

COPY . .
RUN npm install
RUN cd backend && npx prisma generate

EXPOSE 5173 3000

CMD ["npm", "start"]
