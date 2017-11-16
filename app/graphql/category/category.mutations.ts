import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';

import { categoryModel as model, categoryTechnologyModel } from '../../models';
import { listString, notNullString } from '../helpers';
import { insertCategoryTechnologies } from '../category-technology';
import { categoryList } from './category.types';

export const categoryMutations: GraphQLFieldConfigMap<any, any> = {
  addCategory: {
    type: categoryList,
    args: {
      title: { type: notNullString },
      technologies: { type: listString },
    },
    async resolve(root, { title, technologies }) {
      const { _id } = await model.create({ title });
      await insertCategoryTechnologies(_id, technologies);
      return model.find().exec();
    },
  },
  editCategory: {
    type: categoryList,
    args: {
      id: { type: notNullString },
      title: { type: GraphQLString },
      technologies: { type: listString },
    },
    async resolve(root, { id, title, technologies }) {
      await model.findByIdAndUpdate(id, { title }).exec();
      if (technologies && technologies.length) {
        await categoryTechnologyModel.remove({ category_id: id }).exec();
        await insertCategoryTechnologies(id, technologies);
      }
      return model.find().exec();
    },
  },
  deleteCategory: {
    type: categoryList,
    args: {
      id: { type: notNullString },
    },
    async resolve(root, { id }) {
      await model.findByIdAndRemove(id).exec();
      await categoryTechnologyModel.remove({ category_id: id });
      return model.find().exec();
    },
  },
};
