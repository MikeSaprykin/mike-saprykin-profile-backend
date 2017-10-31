import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import { TodoModel } from '../models';

import { filter, not, isEmpty, omit, pipe } from 'ramda';

export const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    done: { type: GraphQLBoolean },
  }),
});

const todoListType = new GraphQLList(TodoType);

enum TodoFilter {
  ALL,
  DONE,
  ACTIVE,
}

export const todoQueries = {
  todos: {
    type: todoListType,
    args: {
      done: { type: GraphQLInt },
    },
    resolve(root, { done }) {
      const lookUp = {
        [TodoFilter.ALL]: {},
        [TodoFilter.DONE]: { done: true },
        [TodoFilter.ACTIVE]: { done: false },
      };
      return TodoModel.find(lookUp[done]).exec();
    },
  },
};

const notNullString = new GraphQLNonNull(GraphQLString);

export const todoMutations = {
  addTodo: {
    type: todoListType,
    args: {
      title: { type: notNullString },
      description: { type: GraphQLString },
      done: { type: GraphQLBoolean },
    },
    resolve(root, { title, description = '', done = false }) {
      return TodoModel.insertMany([{ title, description, done }]);
    },
  },
  deleteTodo: {
    type: todoListType,
    args: {
      id: { type: notNullString },
    },
    resolve(root, { id }) {
      return TodoModel.findByIdAndRemove(id).exec();
    },
  },
  toggleDone: {
    type: TodoType,
    args: {
      id: { type: notNullString },
      done: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    resolve(root, { id, done }) {
      return TodoModel.findByIdAndUpdate(id, { done }).exec();
    },
  },
  editTodo: {
    type: TodoType,
    args: {
      id: { type: notNullString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      done: { type: GraphQLBoolean },
    },
    resolve(root, args) {
      const { id } = args;
      const updateData = pipe(filter(val => not(isEmpty(val))), omit(['id']))(
        args
      );
      return TodoModel.findByIdAndUpdate(id, updateData).exec();
    },
  },
};
