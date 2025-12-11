const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// allow JSON
app.use(bodyParser.json());

// simple logger
app.use((req, res, next) => {
  console.log('REQ', req.method, req.path, 'body=', JSON.stringify(req.body || {}));
  next();
});

// test route
app.post('/submit', (req, res) => {
  res.json({ ok: true, route: '/submit', received: req.body });
});

app.get('/', (req, res) => res.send('<h1>frontend diag</h1>'));

// BIND TO ALL INTERFACES
app.listen(PORT, '0.0.0.0', () => console.log(`Frontend listening on 0.0.0.0:${PORT}`));
