import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { todoQueries, todoMutations } from './todo';
import { fileMutations } from './file';

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
    ...fileMutations,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
