
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

let users = [];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
  }
`;


const resolvers =  {
  Query: {
    users: () => users,
  },
    Mutation: {
     addUser: (_, { name, email }) => {
      const newUser = { id: users.length + 1, name, email };
      users.push(newUser);
      return newUser;
    },
  },
};


async function startServer() {
  const app = express();
  app.use(cors()); 

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
    server.applyMiddleware({ app });

   const PORT = process.env.PORT || 4000;

      app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
