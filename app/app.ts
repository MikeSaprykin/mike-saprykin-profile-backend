import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as expressGraphQL from 'express-graphql';
import { schema } from './schemas';

export const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
