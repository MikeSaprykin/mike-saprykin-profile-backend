import { descriptionsListType } from './description.types';
import { descriptionModel } from '../../models';
import { GraphQLFieldConfigMap } from 'graphql';

export const descriptionQueries: GraphQLFieldConfigMap<any, any> = {
  descriptions: {
    type: descriptionsListType,
    resolve() {
      return descriptionModel.find({}).exec();
    },
  },
};
