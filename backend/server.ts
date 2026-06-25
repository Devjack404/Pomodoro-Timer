import express from 'express';

const app = express();
const port = 3000;

app.get('/home', (req, res) => {
  console.log('hello')
})

app.post('/login', (req, res) => {
  res.send('hello01') 
})

app.get('/register', (req, res) => {
  res.send('fitur segera dibuat')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

