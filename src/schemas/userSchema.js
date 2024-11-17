const { gql } = require('apollo-server');

const typeDefsUser = gql`
    type Address {
        street: String
        exterior: String
        interior: String
        neighborhood: String
        city: String
        municipality: String
        zip: String!
        state: String
        country: String
    }

    input AddressInput {
        street: String
        exterior: String
        interior: String
        neighborhood: String
        city: String
        municipality: String
        zip: String!
        state: String
        country: String
    }

    type User {
        _id: ID!
        rfc: String!
        name: String!
        email: String!
        password: String!
        address: Address!
        phone: String!
        createdAt: String
        role: String!
        paymentMethod: [String!]!
        facturapiid: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(
            rfc: String!
            name: String!
            email: String!
            password: String!
            address: AddressInput!
            phone: String!
            role: String
            paymentMethod: [String!]
            facturapiid: String
        ): User!

        updateUser(
            _id: ID!
            facturapiId: String
            rfc: String
            name: String
            email: String
            password: String
            address: AddressInput
            phone: String
            role: String
            paymentMethod: [String!]
            facturapiid: String
        ): User!

        deleteUser(_id: ID!): User!
    }
`;

module.exports = typeDefsUser;