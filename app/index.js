const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

const dbConfig = {
   host: 'db',
   user: 'root',
   password: 'root',
   database: 'fullcycle',
};

app.get('/', async (req, res) => {
   let connection;
   try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM people LIMIT 1');

      if (rows.length > 0) {
         res.send(`<h1>${rows[0].name}</h1>`);
      } else {
         res.status(404).json({ message: 'Nenhum registro encontrado.' });
      }
   } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
   } finally {
      if (connection) {
         await connection.end();
      }
   }
});

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});
