const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const users = [{ id: 1, username: 'Anton', age: 25 }];

const createUser = (input) => {
    const id = Date.now();
    return { id, ...input };
};

const rootValue = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({ id }) => {
        return users.find(user => user.id == id);
    },
    createUser: ({ input }) => {
        const user = createUser(input);
        users.push(user);
        return user;
    }
};

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.listen(5000, () => console.log('Server has been started on port 5000'));
