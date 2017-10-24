import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as expressGraphQL from 'express-graphql';
import schema from './schemas';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

export default app;
