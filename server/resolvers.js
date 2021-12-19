const { PubSub, withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();
const users = [{ id: 1, username: 'Anton', age: 25 }];

const createUser = (input) => {
    const id = Date.now();
    return { id, ...input };
};

const resolvers = {
    Query: {
        getUser: ({ id }) => {
            return users.find(user => user.id == id);
        },
        getAllUsers: () => {
            return users;
        },
    },
    Mutation: {
        createUser: (_, { input }) => {
            const user = createUser(input);
            users.push(user);
            pubsub.publish('USER_CREATED', { userCreated: input });
            return user;
        },
    },
    Subscription: {
        createUser: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(['USER_CREATED']),
                (payload, variables) => {
                    console.log('|| sub emit ||', payload, variables);
                    return true;
                }
            )
        },
    },
};

// const rootValue = {
//     ...resolvers.Query,
//     ...resolvers.Mutation,
//     ...resolvers.Subscription
// };

// module.exports = rootValue;
module.exports = resolvers;
