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

const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const http = require('http');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const {execute, subscribe} = require('graphql');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {makeExecutableSchema} = require('@graphql-tools/schema');

const PORT = 5000;

(async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const server = new ApolloServer({
        schema,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                }
            }
        }],
    });

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            onConnect(connectionParams, webSocket, context) {
                console.log('Connected');
            },
            onDisconnect(webSocket, context) {
                console.log('Disconnected');
            },
        },
        {server: httpServer, path: server.graphqlPath}
    );

    await server.start();
    server.applyMiddleware({ app, path: '/' });

    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
})();
