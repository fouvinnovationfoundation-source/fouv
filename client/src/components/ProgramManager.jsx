import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/programs`;

const createNewSection = () => ({ type: 'text', content: '' });

export default function ProgramManager() {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [enrollAsLearnerLink, setEnrollAsLearnerLink] = useState('');
  const [enrollAsMentorLink, setEnrollAsMentorLink] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [sections, setSections] = useState([createNewSection()]);
  const [programs, setPrograms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setPrograms)
      .catch(() => setError('Failed to load programs'));
  }, []);

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const addSection = () => setSections([...sections, createNewSection()]);
  const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

  const moveSection = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setSections(updated);
  };

  const resetForm = () => {
    setTitle('');
    setTagline('');
    setEnrollAsLearnerLink('');
    setEnrollAsMentorLink('');
    setCoverImage(null);
    setHeroImage(null);
    setSections([createNewSection()]);
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('tagline', tagline);
    formData.append('enrollAsLearnerLink', enrollAsLearnerLink);
    formData.append('enrollAsMentorLink', enrollAsMentorLink);
    if (coverImage) formData.append('coverImage', coverImage);
    if (heroImage) formData.append('heroImage', heroImage);

    const formattedSections = [];
    sections.forEach((section, i) => {
      if (section.type === 'image' && section.content instanceof File) {
        const key = `imageSection${i}`;
        formData.append(key, section.content);
        formattedSections.push({ type: 'image', content: `__file__${key}` });
      } else {
        formattedSections.push(section);
      }
    });

    formData.append('sections', JSON.stringify(formattedSections));

    try {
      const res = await fetch(`${API}${editingId ? '/' + editingId : ''}`, {
        method: editingId ? 'PUT' : 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to save program');
      const data = await res.json();
      setPrograms(editingId
        ? programs.map(p => (p._id === editingId ? data : p))
        : [data, ...programs]
      );
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (p) => {
    setTitle(p.title);
    setTagline(p.tagline);
    setEnrollAsLearnerLink(p.enrollAsLearnerLink || '');
    setEnrollAsMentorLink(p.enrollAsMentorLink || '');
    setCoverImage(null);
    setHeroImage(null);

    const preparedSections = p.sections.map(sec => {
      if (sec.type === 'image' && sec.content.startsWith('uploads/')) {
        return { ...sec, preview: `${import.meta.env.VITE_API_BASE_URL}/${sec.content}` };
      }
      return { ...sec };
    });

    setSections(preparedSections);
    setEditingId(p._id);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program?')) return;
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setPrograms(programs.filter(p => p._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Manage Programs</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-5">
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Program Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Cover Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setCoverImage(e.target.files[0])}
              accept="image/*"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Hero Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setHeroImage(e.target.files[0])}
              accept="image/*"
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="Enroll as Learner Link"
              value={enrollAsLearnerLink}
              onChange={(e) => setEnrollAsLearnerLink(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="Enroll as Mentor Link"
              value={enrollAsMentorLink}
              onChange={(e) => setEnrollAsMentorLink(e.target.value)}
            />
          </div>
        </div>

        <h5 className="mb-3">Sections</h5>
        {sections.map((section, index) => (
          <div key={index} className="border p-3 rounded mb-3 bg-light">
            <div className="row g-2 align-items-center">
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={section.type}
                  onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="importantPoints">Important Points</option>
                </select>
              </div>

              <div className="col-md-7">
                {(section.type === 'text' || section.type === 'importantPoints') ? (
                  <textarea
                    className="form-control"
                    rows="2"
                    value={section.content}
                    placeholder={section.type === 'text' ? 'Enter text...' : 'Enter bullet points...'}
                    onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                  />
                ) : (
                  <>
                    <input
                      type="file"
                      className="form-control mb-2"
                      accept="image/*"
                      onChange={(e) => handleSectionChange(index, 'content', e.target.files[0])}
                    />
                    {section.preview && (
                      <img src={section.preview} alt="section preview" width={150} />
                    )}
                  </>
                )}
              </div>

              <div className="col-md-2 d-flex flex-column justify-content-center align-items-end gap-2">
                <div className="d-flex gap-2">
                  <div
                    onClick={() => moveSection(index, -1)}
                    style={arrowBtnStyle}
                  >
                    <FaArrowUp />
                  </div>
                  <div
                    onClick={() => moveSection(index, 1)}
                    style={arrowBtnStyle}
                  >
                    <FaArrowDown />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeSection(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-outline-primary mb-4" onClick={addSection}>
          + Add Section
        </button>

        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-success">
            {editingId ? 'Update Program' : 'Publish Program'}
          </button>
          {error && <span className="text-danger ms-3">{error}</span>}
        </div>
      </form>

      <h4 className="fw-semibold mb-3">Existing Programs</h4>
      {programs.length === 0 ? (
        <p className="text-muted">No programs found.</p>
      ) : (
        <ul className="list-group">
          {programs.map(p => (
            <li
              key={p._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{p.title}</strong> — {p.tagline}
                {p.coverImage && (
                  <div>
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/${p.coverImage}`}
                      alt="cover"
                      width={100}
                    />
                  </div>
                )}
                {p.heroImage && (
                  <div>
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/${p.heroImage}`}
                      alt="hero"
                      width={100}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex flex-wrap gap-2">
                {p.enrollAsLearnerLink && (
                  <a
                    href={p.enrollAsLearnerLink}
                    className="btn btn-sm btn-outline-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enroll as Learner
                  </a>
                )}
                {p.enrollAsMentorLink && (
                  <a
                    href={p.enrollAsMentorLink}
                    className="btn btn-sm btn-outline-secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enroll as Mentor
                  </a>
                )}
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const arrowBtnStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#0d6efd',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '1.2rem'
};
