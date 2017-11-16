import { categoryTechnologyList } from './category-technology.types';
import { categoryTechnologyModel } from '../../models';
import { GraphQLFieldConfigMap } from 'graphql';

export const categoryTechnologyQueries: GraphQLFieldConfigMap<any, any> = {
  category_technology: {
    type: categoryTechnologyList,
    resolve() {
      return categoryTechnologyModel.find().exec();
    },
  },
};
