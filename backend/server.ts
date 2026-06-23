import express from 'express';

const app = express();
const port = 3000;

app.get('/home', (req, res) => {
  
})

app.post('/login', (req, res) => {
  res.send('') 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});