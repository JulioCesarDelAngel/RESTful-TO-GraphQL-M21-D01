const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
//importar types y resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const routes = require('./routes');
//Importar morgan para revisar endpoints a modificar
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Morgan para revisar endpoints a modificar
app.use(morgan("dev"));

// si estamos en la producción, entregar al cliente/compilar como activos estáticos
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//app.use(routes);

/* db.once('open', () => {
  app.listen(PORT, () => console.log(`ðŸŒ� Now listening on localhost:${PORT}`));
}); */

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers)