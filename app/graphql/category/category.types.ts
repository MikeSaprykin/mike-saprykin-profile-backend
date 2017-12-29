import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { listString } from '../helpers';

export const categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    technologies: { type: listString },
  }),
});

export const categoryList = new GraphQLList(categoryType);
