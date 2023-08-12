const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
// Sử dụng middleware cors
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'e-digital-commerce',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/api/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/categories', (req, res) => {
  const { cate_name, cate_desc } = req.body;
  const category = { cate_name, cate_desc };
  connection.query('INSERT INTO categories SET ?', category, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query when create: ', error);
      res.sendStatus(500);
    } else {
      const insertedCategoryId = results.insertId;
      const insertedCategory = { cate_id: insertedCategoryId, ...category };
      res.json(insertedCategory);
    }
  });
});

app.put('/api/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const { cate_name, cate_desc } = req.body;
  const updateCategory = { cate_name, cate_desc };
  connection.query('UPDATE categories SET ? WHERE cate_id = ?', [updateCategory, categoryId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query when update: ', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  connection.query('DELETE FROM categories WHERE cate_id = ?', categoryId, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query when delete: ', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/api/category/:id', (req, res) => {
  const categoryId = req.params.id;
  connection.query('SELECT * FROM categories WHERE cate_id = ?', [categoryId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query when find:', error);
      res.sendStatus(500);
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    }
  });
});

app.get('/api/categories/search', (req, res) => {
  const searchTerm = req.query.search;
  const query = `SELECT * FROM categories WHERE cate_name LIKE "%${searchTerm}%"`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query when searching categories:', error);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
