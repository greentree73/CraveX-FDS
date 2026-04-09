import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

// HTTP link to GraphQL backend
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// Authentication link using ApolloLink (no setContext)
const authLink = new ApolloLink((operation, forward) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") // <-- match your login storage key
      : null;

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

// Apollo client with link chain
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
