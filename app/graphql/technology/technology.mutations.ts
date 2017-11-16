import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';
import { omit } from 'lodash';

import {
  technologyModel as model,
  categoryTechnologyModel,
} from '../../models';
import { notNullString, notNullListString, listString } from '../helpers';
import { technologiesListType } from './technology.types';

export const technologyMutations: GraphQLFieldConfigMap<any, any> = {
  addTechnology: {
    type: technologiesListType,
    args: {
      title: { type: notNullString },
      description: { type: notNullString },
      icon: { type: notNullString },
      categories: { type: notNullListString },
    },
    async resolve(root, { title, description, icon, categories }) {
      const { _id } = await model.create({ title, description, icon });
      await categoryTechnologyModel.insertMany(
        categories.map(category_id => ({
          category_id,
          technology_id: _id,
        }))
      );
      return model.find().exec();
    },
  },
  editTechnology: {
    type: technologiesListType,
    args: {
      id: { type: notNullString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: { type: GraphQLString },
      categories: { type: listString },
    },
    async resolve(root, args) {
      const { id, categories } = args;
      await model.findByIdAndUpdate(id, omit(args, 'id')).exec();
      if (categories && categories.length) {
        await categoryTechnologyModel.remove({ technology_id: id }).exec();
        await categoryTechnologyModel.insertMany(
          categories.map(category_id => ({
            category_id,
            technology_id: id,
          }))
        );
      }
      return model.find().exec();
    },
  },
  deleteTechnology: {
    type: technologiesListType,
    args: {
      id: { type: notNullString },
    },
    async resolve(root, { id }) {
      await model.findByIdAndRemove(id).exec();
      await categoryTechnologyModel.remove({ technology_id: id });
      return model.find().exec();
    },
  },
};
