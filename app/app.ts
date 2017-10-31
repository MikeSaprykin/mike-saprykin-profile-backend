import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as expressGraphQL from 'express-graphql';
import { schema } from './schemas';
import * as cors from 'cors';

export const app = express();

app.use(
  '/graphql',
  cors(),
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  console.log('WE HAVE A REQUEST!!!');
  res.send('Hello World!');
});
