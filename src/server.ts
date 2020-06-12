import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333, err => {
  if (err) {
    return console.error(err);
  }

  return console.log(`server is listening on http://localhost:${3333}`);
});