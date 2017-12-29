import { categoryList } from './category.types';
import { categoryModel } from '../../models';
import { GraphQLFieldConfigMap } from 'graphql';
import { categoryTechnologyModel } from '../../models/category-technology';

export const categoryQueries: GraphQLFieldConfigMap<any, any> = {
  categories: {
    type: categoryList,
    async resolve() {
      const categoryTechnologies = await categoryTechnologyModel.find().exec();
      return await new Promise(resolve => {
        categoryModel.find({}, (e, categories) => {
          resolve(
            categories.map(category => ({
              ...category.toObject(),
              technologies: categoryTechnologies
                .filter(
                  ({ category_id }) =>
                    category_id === category._id.toHexString()
                )
                .map(({ technology_id }) => technology_id),
            }))
          );
        });
      });
    },
  },
};
