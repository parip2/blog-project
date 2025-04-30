const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogdb',
  password: 'Parme$an5555',
  port: 5432,
});

// Routes
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
});

app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    await pool.query(
      'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3)',
      [title, content, author]
    );
    res.status(201).send('Post created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// DELETE a post
app.delete('/posts/:id', async (req, res) => {
	const { id } = req.params;
	try {
	  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
	  res.status(200).send('Post deleted');
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Error deleting post');
	}
});

//EDIT
app.put('/posts/:id', async (req, res) => {
	const { id } = req.params;
	const { title, content, author } = req.body;
  
	try {
	  await pool.query(
		'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4',
		[title, content, author, id]
	  );
	  res.status(200).send('Post updated');
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Error updating post');
	}
});
  
  