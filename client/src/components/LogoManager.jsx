import React, { useEffect, useState } from 'react';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/logos`;

export default function LogoManager() {
  const [logos, setLogos] = useState([]);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  // Load and sort logos (newest first)
  const load = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );
      setLogos(sorted);
    } catch (error) {
      setErr('Failed to load logos');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setErr('');
    if (!file) return setErr('Please choose a file to upload');

    const formData = new FormData();
    formData.append('logo', file);

    try {
      setLoading(true);
      const res = await fetch(API, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const newLogo = await res.json();

      setLogos([newLogo, ...logos]);
      setFile(null);
      setErr('');
    } catch (error) {
      setErr('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setLogos(logos.filter((logo) => logo._id !== id));
    } catch (error) {
      setErr('Failed to delete logo.');
    }
  };

  return (
    <div className="container py-5 bg-light rounded shadow-sm">
      <h3 className="mb-4 text-center fw-bold text-primary">Manage Logos</h3>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="d-flex align-items-center gap-3 mb-4">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {err && <span className="text-danger">{err}</span>}
      </form>

      {/* Logo Display */}
      <div className="row">
        {logos.length > 0 ? (
          logos.map((logo) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={logo._id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${logo.url}`}
                  alt={logo.originalName}
                  className="card-img-top p-3"
                  style={{ objectFit: 'contain', height: '150px' }}
                />
                <div className="card-body text-center">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(logo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No logos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
