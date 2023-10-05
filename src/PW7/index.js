const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const port = 1234;
const schema = require('./schema/schema')

const app = express();
app. use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));
app.listen(port);