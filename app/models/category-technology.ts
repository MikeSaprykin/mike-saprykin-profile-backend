import { mongoose } from '../config';

export interface CategoryTechnology {
  _id: string;
  category_id: string;
  technology_id: string;
}

const categoryTechnologySchema = new mongoose.Schema({
  category_id: { type: String, required: 'Category Id is required' },
  technology_id: { type: String, required: 'Technology Id is required' },
});

export const categoryTechnologyModel = mongoose.model(
  'category_technology',
  categoryTechnologySchema
);
