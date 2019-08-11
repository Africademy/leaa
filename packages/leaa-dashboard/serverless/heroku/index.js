const path = require('path');
const compression = require('compression');
const express = require('express');

const port = process.env.PORT || 7000;
const app = express();

app.use(compression());
app.use(express.static('.'));

app.get('/deploy.txt', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'deploy.txt'));
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`> 🔰 PRODUCTION / URL ✨✨ http://localhost:${port} ✨✨\n`);
});
