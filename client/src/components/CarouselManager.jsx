import React, { useEffect, useState } from 'react';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/images`;

const CarouselManager = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setImages(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return setError('Please choose an image file.');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('buttonText', buttonText);
    formData.append('buttonLink', buttonLink);

    try {
      const res = await fetch(API, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const newImage = await res.json();
      setImages([newImage, ...images]);
      setFile(null);
      setTitle('');
      setSubtitle('');
      setButtonText('');
      setButtonLink('');
      setError('');
    } catch (err) {
      setError('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setImages(images.filter((img) => img._id !== id));
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center fw-bold text-primary">Manage Carousel Images</h3>

      <form onSubmit={handleUpload} className="mb-5 bg-light p-4 rounded shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Main Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Button Text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="url"
              className="form-control"
              placeholder="Button Link"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
            />
          </div>

          <div className="col-12 d-flex align-items-center justify-content-between">
            <button className="btn btn-success">Upload</button>
            {error && <span className="text-danger">{error}</span>}
          </div>
        </div>
      </form>

      {/* Uploaded Carousel List */}
      <div className="row">
        {images.map((img) => (
          <div className="col-md-4 mb-4" key={img._id}>
            <div className="card shadow-sm h-100">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${img.url}`}
                alt={img.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5>{img.title}</h5>
                <p>{img.subtitle}</p>
                {img.buttonText && (
                  <a href={img.buttonLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                    {img.buttonText}
                  </a>
                )}
              </div>
              <div className="card-footer text-end">
                <button
                  onClick={() => handleDelete(img._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && <p className="text-center">No carousel images uploaded.</p>}
      </div>
    </div>
  );
};

export default CarouselManager;
