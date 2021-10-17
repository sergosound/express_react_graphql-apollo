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

module.exports = rootValue;
