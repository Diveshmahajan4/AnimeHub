# AnimeHub

Anime Hub is your one-stop destination for all things anime. Dive into a world of captivating stories, exciting adventures, and colorful characters. It offers a massive library of your favorite anime series and movies.

[![Deploy with Vercel](https://vercel.com/button)](anime-hub-rust.vercel.app)

<h3>TechStack:</h3>

[![My Skills](https://skillicons.dev/icons?i=ts,next,prisma,mongo)](https://skillicons.dev)

### Cloning the repository

```shell
git clone https://github.com/Diveshmahajan4/AnimeHub.git
```

### Build Docker image

```shell
docker build -t animehub .
```

### Run Docker container

```shell
docker run -p 3000:3000 animehub
```

## Manual Installation
### Install packages

```shell
npm install
```

### Setup .env file

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```
### Note
For docker add env variables without the `"`. 

### Start the app

```shell
npm run dev
```
