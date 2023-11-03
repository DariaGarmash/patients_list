import express from 'express';

import fs from 'fs';

const app = express();

const pathToData = new URL('data/patients.json', import.meta.url);

const data = JSON.parse(fs.readFileSync(pathToData));

app.get('/api/v1/patients', (_ , res) => {
  setTimeout(() => {
    res.json(data);
  }, 300);
});

app.listen(3001, (_) => {
  console.log('API server running on localhost:3001');
});