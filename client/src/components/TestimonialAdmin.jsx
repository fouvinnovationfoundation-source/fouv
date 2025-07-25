import React, { useState, useEffect } from 'react';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/testimonials`;

export default function TestimonialAdmin() {
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [image, setImage] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Load existing testimonials
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setTestimonials)
      .catch(() => setError('Failed to load testimonials'));
  }, []);

  // Add or Update Testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote || !name) return setError('Quote and Name are required');

    const formData = new FormData();
    formData.append('quote', quote);
    formData.append('name', name);
    formData.append('profession', profession);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`${API}${editingId ? '/' + editingId : ''}`, {
        method: editingId ? 'PUT' : 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to save testimonial');
      const data = await res.json();

      if (editingId) {
        setTestimonials(testimonials.map(t => (t._id === editingId ? data : t)));
      } else {
        setTestimonials([data, ...testimonials]);
      }

      // Reset form
      setQuote('');
      setName('');
      setProfession('');
      setImage(null);
      setEditingId(null);
      setError('');
    } catch (err) {
      setError(err.message || 'Error occurred');
    }
  };

  // Edit Handler
  const handleEdit = (t) => {
    setQuote(t.quote);
    setName(t.name);
    setProfession(t.profession || '');
    setImage(null); // Set only if changed
    setEditingId(t._id);
    setError('');
  };

  // Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch {
      alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center fw-bold text-primary">Manage Testimonials</h3>

      <form
        onSubmit={handleSubmit}
        className="row g-3 p-4 mb-4 rounded shadow-sm"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Testimonial quote"
            rows="3"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <button className="btn btn-success">
            {editingId ? 'Update Testimonial' : 'Publish Testimonial'}
          </button>
          {error && <span className="text-danger">{error}</span>}
        </div>
      </form>

      <h5 className="mb-3 fw-semibold">Existing Testimonials</h5>
      <ul className="list-group">
        {testimonials.map(t => (
          <li
            key={t._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              “{t.quote.substring(0, 60)}…” <span className="text-muted">— {t.name}</span>
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(t)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
