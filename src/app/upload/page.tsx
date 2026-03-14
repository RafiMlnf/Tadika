'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Random');
  const [uploader, setUploader] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('uploader', uploader);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: 'Sabi beud! File sukses di-upload!' });
        setFile(null);
        setTitle('');
      } else {
        setResult({ success: false, message: data.error || 'Gagal upload nih bro' });
      }
    } catch (err) {
      setResult({ success: false, message: 'Yah error, servernya lagi mode kentang' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="section-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>
        <div className="card" style={{ maxWidth: 500, width: '100%', padding: 32 }}>
          <h1 className="font-display" style={{ marginBottom: 8, fontSize: '2rem' }}>Nyetor File</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
            Upload asupan foto/video aib pas trip ke sini guys. Aman tersimpan di cloud!
          </p>

          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8 }} className="font-mono text-sm">Pilih File Lo</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                style={{ width: '100%', padding: '10px', background: 'var(--color-bg)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8 }} className="font-mono text-sm">Caption / Konteks</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Misal: Si Dito nyasar pas di Bandung"
                required
                style={{ width: '100%', padding: '10px', background: 'var(--color-bg)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8 }} className="font-mono text-sm">Kategori Aib</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--color-bg)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)' }}
              >
                <option value="Bandung 1">Bandung 1</option>
                <option value="Pangandaran">Pangandaran</option>
                <option value="Puncak Bogor">Puncak Bogor</option>
                <option value="Gunung Putri">Gunung Putri</option>
                <option value="Blok M">Blok M</option>
                <option value="Lembang">Lembang</option>
                <option value="Throwback">Throwback</option>
                <option value="Random">Random</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8 }} className="font-mono text-sm">Nama Lu (Biar ketauan siapa yg keren)</label>
              <input
                type="text"
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
                placeholder="Misal: Dito Wingstop"
                required
                style={{ width: '100%', padding: '10px', background: 'var(--color-bg)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)' }}
              />
            </div>

            <button
              type="submit"
              className="nav-pill"
              disabled={!file || loading}
              style={{ marginTop: 16, padding: '14px', fontSize: '1rem', width: '100%', opacity: loading ? 0.7 : 1, textAlign: 'center', display: 'block' }}
            >
              <span className="font-mono">{loading ? 'OTW NGUPLOAD...' : 'GAS UPLOAD'}</span>
            </button>

            {result && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: result.success ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)', color: result.success ? '#10b981' : '#ef4444', fontSize: '0.9rem' }}>
                {result.message}
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
