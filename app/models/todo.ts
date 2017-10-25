import { mongoose } from '../config';

export interface Todo {
  title: string;
  description: string;
  id: string;
  done: boolean;
}

export const todoScheme = new mongoose.Schema({
  title: String,
  description: String,
  id: String,
  done: Boolean,
});

export const TodoModel = mongoose.model('todo', todoScheme);
