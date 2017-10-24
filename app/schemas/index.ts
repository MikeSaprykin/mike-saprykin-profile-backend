import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { Cat } from '../models/cat';

const CatType = new GraphQLObjectType({
  name: 'Cat',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cats: {
      type: new GraphQLList(CatType),
      resolve(root, args) {
        return Cat.find().exec();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCat: {
      type: new GraphQLList(CatType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(root, { name }) {
        return Cat.insertMany({ name, type: 'Cat' });
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
