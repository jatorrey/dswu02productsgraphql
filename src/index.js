// src/index.js
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

//Archivos de producto
const typeDefsProducts = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');

//Archivos de usuario
const typeDefsUsers = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');

//Uniendo archivos
const typeDefs = mergeTypeDefs([typeDefsProducts, typeDefsUsers]);
const resolvers = mergeResolvers([productResolvers, userResolvers]);

const startServer = async () => {
  // Conectar a MongoDB
  await mongoose.connect('mongodb+srv://jacatorresre:admin@cluster0.4bnuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  
  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Servidor corriendo en ${url}`);
  });
};

startServer();
