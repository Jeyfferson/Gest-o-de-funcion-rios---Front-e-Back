import db from '../config/db.js';

export const getEmployees = (req, res) => {

  db.query('SELECT * FROM funcionarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar funcionários:', err);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
      return;
    }
    res.json(results);
  });
  
};

export const createEmployee = (req, res) => {

  const { nome, cargo, salario } = req.body;

  const sql = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';
 
  db.query(sql, [nome, cargo, salario], err => {
    if (err) return res.status(500).json({ error: 'Erro ao inserir funcionário' });
    res.json({ message: 'Funcionário inserido com sucesso!' });

  });

}

