import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';
import { omit } from 'lodash';

import { descriptionModel as model } from '../../models';
import { notNullString } from '../helpers';
import { descriptionsListType } from './description.types';

export const descriptionMutations: GraphQLFieldConfigMap<any, any> = {
  addDescription: {
    type: descriptionsListType,
    args: {
      title: { type: notNullString },
      description: { type: notNullString },
      icon: { type: notNullString },
    },
    async resolve(root, { title, description, icon }) {
      await model.insertMany([{ title, description, icon }]);
      return model.find().exec();
    },
  },
  editDescription: {
    type: descriptionsListType,
    args: {
      id: { type: notNullString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: { type: GraphQLString },
    },
    async resolve(root, args) {
      const { id } = args;
      await model.findByIdAndUpdate(id, omit(args, 'id')).exec();
      return model.find().exec();
    },
  },
  deleteDescription: {
    type: descriptionsListType,
    args: {
      id: { type: notNullString },
    },
    async resolve(root, { id }) {
      await model.findByIdAndRemove(id).exec();
      return model.find().exec();
    },
  },
};
