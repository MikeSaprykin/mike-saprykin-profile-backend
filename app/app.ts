import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import { schema } from './schemas';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
const upload = require('apollo-upload-server');

export const app = express();

app.use(
  '/graphql',
  cors(),
  json(),
  upload.apolloUploadExpress(),
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

app.get('/', (req, res) => {
  console.log('WE HAVE A REQUEST!!!');
  res.send('Hello World!');
});
