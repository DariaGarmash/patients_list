import express from 'express';

import fs from 'fs';

const app = express();

const pathToData = new URL('data/patients.json', import.meta.url);

const data = JSON.parse(fs.readFileSync(pathToData));

const timeOut = 300
const userName = "Test User"

app.get('/api/v1/patients', (_, res) => {
  setTimeout(() => {
    res.json(data);
  }, timeOut);
});

app.post('/api/v1/register', (_, res) => {
  setTimeout(() => {
    // validate token properly
    // handle 403 UnAuthorized request
    res.json({
      name: userName
    }
    );
  }, timeOut);
});

app.post('/api/v1/login', (_, res) => {
  setTimeout(() => {
    // handle 403 UnAuthorized request
    res.json({
      token: 'your-secure-token',
      name: userName,
    });
  }, timeOut);
});

app.post('/api/v1/logout', (_, res) => {
  setTimeout(() => {
    res.json({
      status: "ok",
    });
  }, timeOut);
});

app.listen(3001, (_) => {
  console.log('API server running on localhost:3001');
});