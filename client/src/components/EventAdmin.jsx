import React, { useState, useEffect } from 'react';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/events`;

export default function EventAdmin() {
  const empty = {
    title: '',
    date: '',
    details: '',
    caption: '',
    registerLink: '',
    recordedSession: '', // ✅ Added field
  };

  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setErr('Failed to load events.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    if (!form.title || !form.date || !form.details) {
      return setErr('Title, Date & Details are required');
    }

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (file) fd.append('image', file);

    try {
      const res = await fetch(`${API}${editId ? '/' + editId : ''}`, {
        method: editId ? 'PUT' : 'POST',
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) return setErr(data.message || 'Save failed');

      setEvents(editId ? events.map((ev) => (ev._id === editId ? data : ev)) : [data, ...events]);
      setForm(empty);
      setFile(null);
      setEditId(null);
      setPreview(null);
    } catch {
      setErr('Submission failed. Please try again.');
    }
  };

  const delEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (res.ok) setEvents(events.filter((ev) => ev._id !== id));
      else setErr('Failed to delete the event.');
    } catch {
      setErr('Failed to delete the event.');
    }
  };

  const startEdit = (ev) => {
    setForm({
      title: ev.title,
      date: ev.date.split('T')[0],
      details: ev.details,
      caption: ev.caption || '',
      registerLink: ev.registerLink || '',
      recordedSession: ev.recordedSession || '', // ✅ Pre-fill
    });
    setEditId(ev._id);
    setFile(null);
    setPreview(ev.image ? `${import.meta.env.VITE_API_BASE_URL}${ev.image}` : null);
    setErr('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(empty);
    setEditId(null);
    setFile(null);
    setPreview(null);
    setErr('');
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center fw-bold text-primary">{editId ? 'Edit' : 'Add'} Event</h3>

      <form onSubmit={handleSubmit} className="row g-3 p-4 rounded shadow-sm" style={{ background: '#f1f5f9' }}>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <textarea
            rows="3"
            className="form-control"
            placeholder="Details"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="speaker"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Register Link"
            value={form.registerLink}
            onChange={(e) => setForm({ ...form, registerLink: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Recorded Session URL"
            value={form.recordedSession}
            onChange={(e) => setForm({ ...form, recordedSession: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {preview && (
          <div className="col-md-6">
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '120px' }} />
          </div>
        )}

        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-success me-2" type="submit">
              {editId ? 'Update' : 'Publish'}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
          {err && <span className="text-danger">{err}</span>}
        </div>
      </form>

      <h5 className="mt-5">Existing Events</h5>
      {events.length === 0 ? (
        <p className="text-muted">No events added yet.</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Caption</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev._id}>
                <td>{ev.title}</td>
                <td>{new Date(ev.date).toLocaleDateString()}</td>
                <td>{ev.caption}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(ev)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => delEvent(ev._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
