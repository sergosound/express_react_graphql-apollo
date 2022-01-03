import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ApolloProvider } from './providers';


render(
  <ApolloProvider>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
