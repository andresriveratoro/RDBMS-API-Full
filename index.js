const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();
const port = 8000;

server.use(express.json());

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts')
    .insert(cohort)
    .then(id => res.status(201).json(id))
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.listen(port, () => {
  console.log(`\nWeb API running on http://localhost:${port}\n`);
});