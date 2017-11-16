import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

export const notNullString = new GraphQLNonNull(GraphQLString);
export const listString = new GraphQLList(GraphQLString);
export const notNullListString = new GraphQLNonNull(
  new GraphQLList(GraphQLString)
);
