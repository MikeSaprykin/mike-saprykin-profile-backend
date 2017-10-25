import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
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

export const todoQueries = {
  todos: {
    type: todoListType,
    args: {
      done: { type: GraphQLBoolean },
    },
    resolve(root, { done }) {
      const searchCondition = typeof done !== 'undefined' ? { done } : {};
      return TodoModel.find(searchCondition).exec();
    },
  },
};

const notNullString = new GraphQLNonNull(GraphQLString);

export const todoMutations = {
  addTodo: {
    type: todoListType,
    args: {
      title: { type: notNullString },
      description: { type: notNullString },
      done: { type: GraphQLBoolean },
    },
    resolve(root, { title, description, done = false }) {
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
