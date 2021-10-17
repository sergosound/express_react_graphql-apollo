// const express = require('express');
// const cors = require('cors');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema');
// const rootValue = require('./root');
//
// const app = express();
//
// app.use(cors());
// app.use('/graphql', graphqlHTTP({
//     schema,
//     rootValue,
//     graphiql: true,
// }));
//
// app.listen(5000, () => console.log('Server has been started on port 5000'));

// =====================================================================================================================

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const schema = require('./schema');
const rootValue = require('./root');
// const cors = require('cors');

async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = express();
    // app.use(cors());
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app,

        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: '/'
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: 5000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
};

startApolloServer(schema, {
    Query: {
        getUser: rootValue.getUser,
        getAllUsers: rootValue.getAllUsers,
    },
    Mutation: {
        createUser: rootValue.createUser
    }
});
