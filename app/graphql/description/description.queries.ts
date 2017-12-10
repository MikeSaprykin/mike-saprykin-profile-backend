import { descriptionsListType } from './description.types';
import { descriptionModel } from '../../models';
import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';

export const descriptionQueries: GraphQLFieldConfigMap<any, any> = {
  descriptions: {
    type: descriptionsListType,
    args: {
      id: { type: GraphQLString },
    },
    resolve(root, { id }) {
      return descriptionModel.find(id ? { _id: id } : {}).exec();
    },
  },
};
