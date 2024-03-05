import { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP Link
const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL as string,
  });
  
// WebSocket Link
const wsLink = new GraphQLWsLink(createClient({
    url: process.env.REACT_APP_GRAPHQL_WEBSOCKET as string,
}));
  
  // Send query request based on the type definition
const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    uri: process.env.REACT_APP_GRAPHQL_URL as string,
    cache: new InMemoryCache(),
});

export default function ApolloGraphQL({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}