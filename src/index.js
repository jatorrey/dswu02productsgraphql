// src/index.js
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefsProducts = require('./schemas/productSchema');
const typeDefsUsers = require('./schemas/userSchema');
const productResolvers = require('./resolvers/productResolver');
const userResolvers = require('./resolvers/userResolver');

const startServer = async () => {
  // Conectar a MongoDB
  await mongoose.connect('mongodb+srv://jacatorresre:admin@cluster0.4bnuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  
  const server = new ApolloServer({ typeDefs: [typeDefsProducts, typeDefsUsers], resolvers: [productResolvers, userResolvers] });
  
  server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
  });
};

startServer();
