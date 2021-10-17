const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const rootValue = require('./root');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.listen(5000, () => console.log('Server has been started on port 5000'));
