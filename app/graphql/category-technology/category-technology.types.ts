import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const categoryTechnologyType = new GraphQLObjectType({
  name: 'CategoryTechnology',
  fields: () => ({
    _id: { type: GraphQLString },
    category_id: { type: GraphQLString },
    technology_id: { type: GraphQLString },
  }),
});

export const categoryTechnologyList = new GraphQLList(categoryTechnologyType);
