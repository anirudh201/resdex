const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', async (req, res) => {
  try {
    const payload = req.body;
    const fetch = require('node-fetch');
    const response = await fetch(`${BACKEND_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    res.json({ ok: true, backend: data });
  } catch (err) {
    console.error('Forward error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend listening on 0.0.0.0:${PORT}`);
});
