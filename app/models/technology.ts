import { mongoose } from '../config';

export interface Technology {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

const technologySchema = new mongoose.Schema({
  title: { type: String, required: 'Title is required' },
  description: { type: String, required: 'Description is required' },
  icon: { type: String, required: 'Icon URL is required' },
});

export const technologyModel = mongoose.model('technology', technologySchema);
