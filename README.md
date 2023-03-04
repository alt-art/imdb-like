# Imdb-like

Simple imdb-like API using NestJS and PostgreSQL.

## Documentation

Documentation is available [here](https://documenter.getpostman.com/view/16429730/2s93JnTmTc)

## Running trough docker

```bash
docker-compose up
```

## Default admin credentials

```bash
email: demo@example.com
password: demo
```

## Running locally

Set up a PostgreSQL database and create a `.env` file in the root directory with the following content:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/db_name
```

Install dependencies:

```bash
yarn install
```

Run prisma commands:

```bash
yarn prisma db push
```

Run prisma seed:

```bash
yarn prisma db seed
```

Run the app:

```bash
yarn start:dev
```

## Things that I have done

- [x] User can register
- [x] User can login
- [x] User can see his profile
- [x] User can update his profile
- [x] User can delete his profile

- [x] Admin can create a movie
- [x] Admin can update a movie
- [x] Admin can delete a movie

- [x] User can see all movies
- [x] User can see a movie

- [x] User can rate a movie
- [x] User can see his ratings
- [x] User can see all ratings

- [x] User can see all comments
- [x] User can see a comment
- [x] User can create a comment
- [x] User can update a comment
- [x] User can delete a comment

## Things that I would like to do

- [ ] Add tests
- [ ] Add search functionality
- [ ] Add pagination
- [ ] Add sorting
- [ ] Add filtering
- [ ] Add more roles
- [ ] Add more fields to the database like actors, directors, images, etc.
