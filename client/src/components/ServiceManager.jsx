import React, { useEffect, useState } from 'react';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/services`;

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', icon: null });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API).then(res => res.json()).then(setServices);
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'icon') setForm(prev => ({ ...prev, icon: files[0] }));
    else setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    if (form.icon) formData.append('icon', form.icon);

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API}/${editingId}` : API;

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setServices(editingId ? services.map(s => s._id === editingId ? data : s) : [data, ...services]);
      setForm({ title: '', description: '', icon: null });
      setEditingId(null);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = s => {
    setForm({ title: s.title, description: s.description, icon: null });
    setEditingId(s._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this service?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setServices(services.filter(s => s._id !== id));
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center fw-bold text-primary">Manage Services</h3>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded mb-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="form-control mb-2" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" required />
        <input name="icon" type="file" accept="image/*" onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-success">{editingId ? 'Update' : 'Add'} Service</button>
        {error && <span className="text-danger ms-3">{error}</span>}
      </form>

      <div className="row">
        {services.map(s => (
          <div className="col-md-4" key={s._id}>
            <div className="card mb-3">
              {s.iconUrl && <img src={`${import.meta.env.VITE_API_BASE_URL}${s.iconUrl}`} className="card-img-top" alt={s.title} style={{ height: '200px', objectFit: 'cover' }} />}
              <div className="card-body">
                <h5>{s.title}</h5>
                <p>{s.description}</p>
                <button onClick={() => handleEdit(s)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
