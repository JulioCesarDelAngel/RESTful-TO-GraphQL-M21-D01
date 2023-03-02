import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Construir nuestro endpoint principal de API de GraphQL
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construir middleware de solicitud que adjuntará el token de JWT a cada solicitud como encabezado de `authorization`
const authLink = setContext((_, { headers }) => {
  // obtener el token de autenticación del almacenamiento local si existe
  const token = localStorage.getItem('id_token');
  // devolver los encabezados al contexto para que httpLink pueda leerlos
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Configurar nuestro cliente para ejecutar el middleware `authLink` antes de realizar la solicitud a nuestra API de GraphQL
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<SearchBooks/>} />
            <Route exact path='/saved' element={<SavedBooks/>} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
