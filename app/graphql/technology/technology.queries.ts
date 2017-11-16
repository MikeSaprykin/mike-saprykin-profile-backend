import { technologiesListType } from './technology.types';
import { technologyModel } from '../../models';
import { GraphQLFieldConfigMap } from 'graphql';

export const technologyQueries: GraphQLFieldConfigMap<any, any> = {
  technologies: {
    type: technologiesListType,
    resolve() {
      return technologyModel.find({}).exec();
    },
  },
};
