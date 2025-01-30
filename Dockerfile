FROM node:22-bullseye

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt

RUN npx prisma generate

# RUN npm run build

EXPOSE 3000

ENV DATABASE_URL=
ENV GOOGLE_CLIENT_ID=
ENV GOOGLE_CLIENT_SECRET=
ENV GITHUB_ID=
ENV GITHUB_SECRET=
ENV NEXTAUTH_JWT_SECRET=
ENV NEXTAUTH_SECRET=

CMD [ "npm", "run", "dev" ]
# CMD ["sleep", "infinity"]  // For Development purpose