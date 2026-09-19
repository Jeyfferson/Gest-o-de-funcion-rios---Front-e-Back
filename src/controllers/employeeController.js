import db from '../config/db.js';

//Criar Funcionários no banco de dados
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

//Criar Funcionários no banco de dados
export const createEmployee = (req, res) => {

  const { nome, cargo, salario } = req.body;

  const sql = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';
 
  db.query(sql, [nome, cargo, salario], err => {
    if (err) return res.status(500).json({ error: 'Erro ao inserir funcionário' });
    res.json({ message: 'Funcionário inserido com sucesso!' });

  });

}

//Atualizar Funcionários no banco de dados
export const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { nome, cargo, salario } = req.body;

  const sql = 'UPDATE funcionarios SET nome = ?, cargo = ?, salario = ? WHERE id = ?';
  db.query(sql, [nome, cargo, salario, id], err => {
    if (err) {
      console.error('Erro ao atualizar funcionário:', err);
      res.status(500).json({ error: 'Erro ao atualizar funcionário' });
      return;
    }
    res.json({ message: 'Funcionário atualizado com sucesso!' });
  });
};

//Excluir Funcionários no banco de dados
export const deleteEmployee = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM funcionarios WHERE id = ?';
  db.query(sql, [id], err => {
    if (err) {
      console.error('Erro ao excluir funcionário:', err);
      res.status(500).json({ error: 'Erro ao excluir funcionário' });
      return;
    }
    res.json({ message: 'Funcionário excluído com sucesso!' });
  });
};
