import { mongoose } from '../config';

export interface Todo {
  title: string;
  description: string;
  _id: string;
  done: boolean;
}

export const todoScheme = new mongoose.Schema({
  title: { type: String, required: 'Title is required' },
  description: { type: String },
  done: { type: Boolean, default: false },
});

export const TodoModel = mongoose.model('todo', todoScheme);
