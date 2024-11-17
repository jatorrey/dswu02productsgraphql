const { Query } = require('mongoose');
const shoppingcartService = require('../services/shoppingcartService');

const resolvers = {
    Query: {
        getAllShoppingCarts: async () => await shoppingcartService.getAllShoppingCarts(),
        getShoppingCartById: async (_, { _id }) => await shoppingcartService.getShoppingCartById(_id),
        getShoppingCartByUser: async (_, { userId }) => await shoppingcartService.getShoppingCartByUser(userId),
    },
    Mutation: {
        createShoppingCart: async (_, { user, product }) => await shoppingcartService.createShoppingCart({ user, product }),
        updateShoppingCart: async (_, { cartId, updates }) => await shoppingcartService.updateShoppingCart(cartId, updates),
        deleteShoppingCart: async (_, { _id }) => await shoppingcartService.deleteShoppingCart(_id),

        addProductToCart: async (_, { cartId, product }) => await shoppingcartService.addProductToCart(cartId, product),
        removeProductFromCart: async (_, { cartId, product }) => await shoppingcartService.removeProductFromCart(cartId, product),
        closeCart: async (_, { cartId }) => await shoppingcartService.closeCart(cartId)
    },
}

module.exports = resolvers;