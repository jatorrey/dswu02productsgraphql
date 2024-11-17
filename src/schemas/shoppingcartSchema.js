const { gql } = require('apollo-server');

const typeDefsShoppingCart = gql`
    type ProductInCart {
        _id: ID!
        name: String!
        description: String!
        price: Float!
        category: String!
        brand: String!
        stock: Int!
        creationDate: String
        imgs: [String]
        facturapiid: String
    }

    type UserInCart {
        _id: ID!
        name: String
        email: String
        password: String
    }

    type ShoppingCart {
        _id: ID!
        user: UserInCart!
        product: [ProductInCart]!
        subtotal: Float!
        IVA: Float!
        total: Float!
        status: String!
        creationDate: String!
        endDate: String
    }

    type Query {
        getAllShoppingCarts: [ShoppingCart]
        getShoppingCartById(cartId: ID!): ShoppingCart
        getShoppingCartByUser(userId: ID!): [ShoppingCart]
    }

    type Mutation {
        createShoppingCart(user: UserInCartInput!, product: [ProductInCartInput]!): ShoppingCart
        updateShoppingCart(cartId: ID!, updates: ShopCartUpdateInput!): ShoppingCart
        deleteShoppingCart(_id: ID!): ShoppingCart

        addProductToCart(cartId:ID!, product: ProductInCartInput!): ShoppingCart
        removeProductFromCart(cartId:ID!, productId:ID!): ShoppingCart
        closeCart(cartId:ID!): ShoppingCart
    }

    input ProductInCartInput {
        _id: ID!
        name: String!
        description: String!
        price: Float!
        category: String!
        brand: String!
        stock: Int
        creationDate: String
        imgs: [String]
        facturapiid: String
    }

    input UserInCartInput {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }

    input ShopCartUpdateInput {
        subtotal: Float
        IVA: Float
        total: Float
    }
`;

module.exports = typeDefsShoppingCart;