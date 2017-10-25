import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { todoQueries, todoMutations } from './todo';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...todoQueries,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...todoMutations,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
