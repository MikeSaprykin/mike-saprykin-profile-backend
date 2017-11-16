import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const descriptionType = new GraphQLObjectType({
  name: 'Description',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
  }),
});

export const descriptionsListType = new GraphQLList(descriptionType);
