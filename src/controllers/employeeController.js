import db from '../config/db.js';

export const getEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Erro ao buscar funcionários:', err);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
      return;
    }
    res.json(results);
  });
};

export const