import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, age
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, posts {
                id, title, content
            }
        }
    }
`;

export const CREATE_USER_SUBSCRIPTION = gql`
    subscription OnCreateUser($userID: ID!) {
        createUser(userID: $userID) {
            id, name
        }
    }
`;
