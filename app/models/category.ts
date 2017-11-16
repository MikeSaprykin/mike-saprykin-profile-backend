import { mongoose } from '../config';

export interface Category {
  _id: string;
  title: string;
}

const categorySchema = new mongoose.Schema({
  title: { type: String, required: 'Title is required' },
});

export const categoryModel = mongoose.model('category', categorySchema);
