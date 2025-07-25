import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAddBlog = () => {
  const [form, setForm] = useState({ title: '', youtubeUrl: '' });
  const [blogs, setBlogs] = useState([]);
  const [msg, setMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blog`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');

    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blog/${editingId}`, form);
        setMsg('✅ Blog updated!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blog`, form);
        setMsg('✅ Blog added!');
      }

      setForm({ title: '', youtubeUrl: '' });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setMsg('❌ Error saving blog');
    }
  };

  const handleEdit = blog => {
    setForm({ title: blog.title, youtubeUrl: blog.youtubeUrl });
    setEditingId(blog._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/blog/${id}`);
        setMsg('❌ Blog deleted!');
        fetchBlogs();
      } catch (err) {
        console.error('Error deleting blog', err);
      }
    }
  };

  return (
    <div className="card shadow-sm p-4 bg-white">
      <h4 className="mb-3" style={{ color: '#f36624' }}>
        {editingId ? 'Edit Blog' : 'Add YouTube Blog'}
      </h4>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">YouTube URL</label>
          <input
            type="url"
            name="youtubeUrl"
            value={form.youtubeUrl}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-outline-primary"
            style={{ borderColor: '#f36624', color: '#f36624' }}
          >
            {editingId ? 'Update Blog' : 'Add Blog'}
          </button>
        </div>
      </form>

      <h5 style={{ color: '#03518f' }}>All Blogs</h5>
      <div className="row">
        {blogs.map(blog => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card h-100">
              <iframe
                src={blog.youtubeUrl.replace('watch?v=', 'embed/')}
                title={blog.title}
                allowFullScreen
                className="card-img-top"
                style={{ height: '200px' }}
              ></iframe>
              <div className="card-body">
                <h6 className="card-title">{blog.title}</h6>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAddBlog;
