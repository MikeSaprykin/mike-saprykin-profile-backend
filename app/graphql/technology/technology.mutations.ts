import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';
import {
  technologyModel as model,
  categoryTechnologyModel,
} from '../../models';
import { notNullString, notNullListString, listString } from '../helpers';
import { technologiesListType } from './technology.types';
import { insertCategoryTechnologies } from '../category-technology';

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
      await insertCategoryTechnologies(categories, _id);
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
      const { id, categories, title, description, icon } = args;
      await model.findByIdAndUpdate(id, { title, description, icon }).exec();
      if (categories && categories.length) {
        await categoryTechnologyModel.remove({ technology_id: id }).exec();
        await insertCategoryTechnologies(categories, id);
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
