import { mongoose } from '../config';

export enum AnimalType {
  Cat = 'Cat',
  Dog = 'Dog',
}

export interface Animal {
  name: string;
}

export interface Cat extends Animal {
  type: AnimalType.Cat;
}

export interface Dog extends Animal {
  type: AnimalType.Dog;
}

const { Schema } = mongoose;

const catSchema = new Schema({
  name: String,
  type: String,
});

export const Cat = mongoose.model('cat', catSchema);
