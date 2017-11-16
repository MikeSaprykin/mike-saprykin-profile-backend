import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { descriptionMutations, descriptionQueries } from './description';
import { technologyMutations, technologyQueries } from './technology';
import { categoryTechnologyQueries } from './category-technology';
import { categoryMutations, categoryQueries } from './category';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...descriptionQueries,
    ...technologyQueries,
    ...categoryTechnologyQueries,
    ...categoryQueries,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...descriptionMutations,
    ...technologyMutations,
    ...categoryMutations,
  },
});

export default new GraphQLSchema({
  query,
  mutation,
});
