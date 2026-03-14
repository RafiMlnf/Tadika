import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { members } from '@/data/members';

export function generateStaticParams() {
  return members.map((member) => ({
    name: member.id,
  }));
}

export default async function MemberProfile({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const member = members.find((m) => m.id === resolvedParams.name);

  if (!member) {
    notFound();
  }

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingBottom: 100 }}>
        {/* Back Link */}
        <section style={{ paddingTop: 40, paddingBottom: 20 }}>
          <Link href="/profile" className="font-mono text-muted back-link">
            ← KEMBALI KE ANGGOTA
          </Link>
        </section>

        {/* Member Info */}
        <section className="profile-detail">
          <div className="profile-detail-header">
            <div className="profile-detail-img card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={member.image} alt={member.name} />
              <div className="profile-role-badge font-mono">{member.role}</div>
            </div>

            <div className="profile-detail-info">
              <span className="badge badge-accent font-mono" style={{ marginBottom: 16, display: 'inline-block' }}>
                MEMBER SINCE {member.joinYear}
              </span>
              <h1 className="font-display" style={{ fontSize: '3rem', marginBottom: 8 }}>{member.name}</h1>
              
              <div className="social-links-inline font-mono" style={{ marginBottom: 32 }}>
                {member.socials.instagram && (
                  <a href={`https://instagram.com/${member.socials.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="social-link">
                    IG: {member.socials.instagram}
                  </a>
                )}
                {member.socials.twitter && (
                  <a href={`https://twitter.com/${member.socials.twitter.replace('@', '')}`} target="_blank" rel="noreferrer" className="social-link">
                    X: {member.socials.twitter}
                  </a>
                )}
              </div>

              <blockquote className="profile-quote large">
                {member.quote}
              </blockquote>

              <div className="profile-bio">
                <p>{member.bio}</p>
              </div>

              <div className="profile-stats-grid">
                <div className="stat-box card">
                  <span className="stat-value font-display">{member.stats.trips}</span>
                  <span className="stat-label font-mono">TRIPS</span>
                </div>
                <div className="stat-box card">
                  <span className="stat-value font-display">{member.stats.photos}</span>
                  <span className="stat-label font-mono">PHOTOS</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
