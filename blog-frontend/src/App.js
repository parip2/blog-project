import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editAuthor, setEditAuthor] = useState('');


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
  const startEdit = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditAuthor(post.author);
  };
  
  const saveEdit = async (id) => {
    await axios.put(`http://localhost:5000/posts/${id}`, {
      title: editTitle,
      content: editContent,
      author: editAuthor,
    });
    setEditingPostId(null);
    fetchPosts(); // Refresh list
  };
  
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    fetchPosts(); // Refresh the posts after deleting
  };
  

  return (
    <div className="App">
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
          {editingPostId === post.id ? (
            <>
            <input value = {editTitle} 
            onChange = {(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            />
            <input value = {editAuthor} 
            onChange = {(e) => setEditAuthor(e.target.value)}
            placeholder="Author"
            />
            <textarea value={editContent} 
            onChange={(e) => setEditContent(e.target.value)} 
            placeholder="Content"
            />
            <button onClick={() => saveEdit(post.id)}>Save</button>
            <button onClick={() => setEditingPostId(null)}>Cancel</button>
            </>
          
          ) : (
            <>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <i>by {post.author} on {new Date(post.created_at).toLocaleString()}</i>
            <br />
            <button onClick={() => startEdit(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)} style={{ marginTop: 10 }}>Delete</button>
        
            </>
          )}
        </div>
      ))}

    </div>
    </div>
  );
}

export default App;
