import { Schema, model } from 'mongoose';

export interface Todo {
  title: string;
  description: string;
  _id: string;
  done: boolean;
}

export const todoScheme = new Schema({
  title: { type: String, required: 'Title is required' },
  description: { type: String },
  done: { type: Boolean, default: false },
});

export const TodoModel = model('todo', todoScheme);
