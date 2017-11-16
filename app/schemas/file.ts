import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const Upload = new GraphQLInputObjectType({
  name: 'Upload',
  fields: {
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    size: { type: GraphQLString },
    path: { type: GraphQLString },
  },
});

export const fileMutations = {
  updateUserAvatar: {
    type: GraphQLString,
    args: {
      image: { type: Upload },
    },
    resolve(root, { image }) {
      console.log(image);
      return 'Oppa';
    },
  },
};
