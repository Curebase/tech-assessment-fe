# API

This API is build with [Nest.js](https://docs.nestjs.com/) and [GraphQL](https://docs.nestjs.com/graphql/quick-start#schema-first) schema first setup using ApolloServer.

To test the API you can go to http://localhost:4000/graphql and do this query:

```graphql
{
  trials {
    id
  }
}
```

You should get and empty response because on [SQLite](https://docs.nestjs.com/recipes/prisma#set-the-database-connection) database is empty and only contains that table as an example. You have to build the necessary tables and relationships as you see fit. This will be part of the evaluation process. Example response:

```json
{
  "data": {
    "trials": []
  }
}
```

We use [Prisma](https://docs.nestjs.com/recipes/prisma) as our ORM which should make it easier to do database changes and use types in the project.


## Project

You can run the project with:
```
yarn start:dev
```

You can run tests with:
```
yarn test
```

