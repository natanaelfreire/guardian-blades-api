import express from 'express';

const app = express();

const port = 3333;
app.get('/', (req, res) => {
  res.send('Hello TypeScript');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  return console.log(`server is listening on http://localhost:${port}`);
});