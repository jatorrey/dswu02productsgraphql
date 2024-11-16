const { gql } = require('apollo-server');

const typeDefsUser = gql`
    type User {
        _id: ID!
        facturapiid: String!
        rfc: String!
        name: String!
        email: String!
        password: String!
        address: String!
        zip: String!
        phone: String!
        createdAt: String!
        role: String!
        paymentMethod: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(
            facturapiId: String!,
            rfc: String!,
            name: String!,
            email: String!,
            password: String!,
            address: String!,
            zip: String!,
            phone: String!,
            role: String!,
            paymentMethod: String
        ): User

        updateUser(
            _id: ID!,
            facturapiId: String,
            rfc: String,
            name: String,
            email: String,
            password: String,
            address: String,
            zip: String,
            phone: String,
            role: String,
            paymentMethod: String
        ): User

        deleteUser(_id: ID!): User
    }
`;

module.exports = typeDefsUser;