import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';
import { omit } from 'lodash';

import { categoryModel as model, categoryTechnologyModel } from '../../models';
import { listString, notNullString } from '../helpers';
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
      if (technologies && technologies.length) {
        await categoryTechnologyModel.insertMany(
          technologies.map(technology_id => ({
            category_id: _id,
            technology_id,
          }))
        );
      }
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
        await categoryTechnologyModel.insertMany(
          technologies.map(technology_id => ({
            category_id: id,
            technology_id,
          }))
        );
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
