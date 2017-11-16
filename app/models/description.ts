import { mongoose } from '../config';

export interface Description {
  title: string;
  description: string;
  _id: string;
  icon: string;
}

const descriptionSchema = new mongoose.Schema({
  title: { type: String, required: 'Title is required' },
  description: { type: String, required: 'Description is required' },
  icon: { type: String, required: 'Icon class name is required' },
});

export const descriptionModel = mongoose.model(
  'description',
  descriptionSchema
);
