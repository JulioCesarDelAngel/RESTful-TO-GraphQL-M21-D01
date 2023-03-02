const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me:User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String    
    savedBooks: [Book]!
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link : String
    title: String
  }


  `;
  
  module.exports = typeDefs;