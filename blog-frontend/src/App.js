import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch posts when page loads
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/posts');
    setPosts(res.data);
  };

  const createPost = async () => {
    await axios.post('http://localhost:5000/posts', { title, content, author });
    fetchPosts(); // reload posts
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Blog</h1>

      <h2>Create a Post</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={createPost}>Post</button>

      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ margin: 10, padding: 10, border: '1px solid black' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <i>by {post.author} on {new Date(post.created_at).toLocaleString()}</i>
        </div>
      ))}
    </div>
  );
}

export default App;
