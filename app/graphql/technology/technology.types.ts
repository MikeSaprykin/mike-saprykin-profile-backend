import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const technologyType = new GraphQLObjectType({
  name: 'Technology',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
  }),
});

export const technologiesListType = new GraphQLList(technologyType);
