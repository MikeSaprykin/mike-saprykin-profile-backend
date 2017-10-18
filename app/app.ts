import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as http from 'http';
import * as path from 'path';

const app = express();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

export default app;
