import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    _id: { type: GraphQLString },
    category_id: { type: GraphQLString },
    technology_id: { type: GraphQLString },
  }),
});

export const categoryList = new GraphQLList(categoryType);
