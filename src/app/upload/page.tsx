'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Random');
  const [uploader, setUploader] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setLoading(true);
    setResult(null);

    let successCount = 0;
    let failCount = 0;

    for (const f of files) {
      const formData = new FormData();
      formData.append('file', f);
      formData.append('title', `${title} - ${f.name}`);
      formData.append('category', category);
      formData.append('uploader', uploader);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        failCount++;
      }
    }

    setLoading(false);
    
    if (failCount === 0) {
       setResult({ success: true, message: `Sabi beud! ${successCount} File sukses di-upload!` });
       setFiles([]);
       setTitle('');
    } else {
       setResult({ success: false, message: `Kelakon: ${successCount} sukses, ${failCount} gagal upload nih bro.` });
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
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  setFiles(selectedFiles);
                }}
                required
                style={{ width: '100%', padding: '10px', background: 'var(--color-bg)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)' }}
              />
              {files.length > 0 && (
                <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  <em>{files.length} file dipilih.</em>
                </div>
              )}
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
                <option value="Jakarta">Jakarta</option>
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
              disabled={files.length === 0 || loading}
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
