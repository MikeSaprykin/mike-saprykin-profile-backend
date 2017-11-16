import * as express from 'express';
import { json } from 'body-parser';
import schema from './graphql';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

export const app = express();

app.use(
  '/graphql',
  cors(),
  json(),
  graphqlExpress({
    schema,
  })
);
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);
