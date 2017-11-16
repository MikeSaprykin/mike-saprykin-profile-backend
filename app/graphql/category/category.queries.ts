import { categoryList } from './category.types';
import { categoryModel } from '../../models';
import { GraphQLFieldConfigMap } from 'graphql';

export const categoryQueries: GraphQLFieldConfigMap<any, any> = {
  category_technology: {
    type: categoryList,
    resolve() {
      return categoryModel.find().exec();
    },
  },
};
