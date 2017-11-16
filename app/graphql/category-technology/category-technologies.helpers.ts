import { isArray, isObject } from 'lodash';
import { and, not, isNil } from 'ramda';
import { categoryTechnologyModel as model } from '../../models';

export const insertCategoryTechnologies = (category, technology) => {
  let items = null;
  if (and(isArray(category), isObject(technology))) {
    items = category.map(category_id => ({
      category_id,
      technology_id: technology,
    }));
  } else if (and(isObject(category), isArray(technology))) {
    items = technology.map(technology_id => ({
      category_id: category,
      technology_id,
    }));
  }
  return not(isNil(items)) ? model.insertMany(items) : Promise.resolve([]);
};
