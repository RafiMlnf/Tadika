"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Member } from "@/data/members";

export default function MemberDetail({ member }: { member: Member }) {
  const [ytPlaying, setYtPlaying] = useState(false);
  const ytRef = useRef<HTMLIFrameElement>(null);
  const [origin, setOrigin] = useState("");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    setOrigin(window.location.origin);

    const onMessage = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          // Only update if it's the expected infoDelivery event containing time info
          if (data.event === "infoDelivery" && data.info) {
            if (data.info.currentTime !== undefined) {
              setProgress(data.info.currentTime);
            }
            if (data.info.duration !== undefined) {
              setDuration(data.info.duration);
            }
          }
        } catch (e) {}
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const onIframeLoad = () => {
    if (ytRef.current && ytRef.current.contentWindow) {
      ytRef.current.contentWindow.postMessage(JSON.stringify({ event: "listening" }), "*");
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (ytRef.current && ytRef.current.contentWindow) {
      ytRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "seekTo",
          args: [val, true],
        }),
        "*",
      );
    }
  };

  const toggleYt = useCallback(() => {
    if (!ytRef.current) return;
    const iframe = ytRef.current;
    if (ytPlaying) {
      iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
      setYtPlaying(false);
    } else {
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
      setYtPlaying(true);
    }
  }, [ytPlaying]);

  return (
    <div className="grid-bg" style={{ minHeight: "100vh", position: "relative" }}>
      <Navbar />

      <div className="section-container" style={{ position: "relative", zIndex: 1, paddingBottom: 100 }}>
        {/* Back Link */}
        <section style={{ paddingTop: 40, paddingBottom: 20 }}>
          <Link href="/profile" className="font-mono text-muted back-link">
            ← BALIK KE LIST MEMBER
          </Link>
        </section>

        {/* Member Info */}
        <section className="profile-detail">
          <div className="profile-detail-header">
            <div className={`vocal-glow-wrapper${ytPlaying ? " glow-active" : ""}`}>
              <div className="profile-detail-img card">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={800}
                    height={1000}
                    style={{
                      objectFit: "cover",
                      objectPosition: `${member.imageOffsetX || "center"} ${member.imageOffsetY || "center"}`,
                      width: "100%",
                      height: "100%",
                      transform: member.imageScale ? `scale(${member.imageScale})` : "none",
                      transformOrigin: "center center",
                    }}
                    priority
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, var(--color-border), var(--color-bg))",
                      fontSize: "5rem",
                      fontWeight: 700,
                      color: "var(--color-text-muted)",
                      minHeight: 400,
                    }}
                    className="font-display"
                  >
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="profile-detail-info">
              <h1 className="font-display" style={{ fontSize: "3rem", marginBottom: 8 }}>
                {member.name}
              </h1>

              <div className="social-links-inline font-mono" style={{ marginBottom: 32 }}>
                {member.socials.instagram && (
                  <a href={`https://instagram.com/${member.socials.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" className="social-link">
                    IG: {member.socials.instagram}
                  </a>
                )}
                {member.socials.twitter && (
                  <a href={`https://twitter.com/${member.socials.twitter.replace("@", "")}`} target="_blank" rel="noreferrer" className="social-link">
                    X: {member.socials.twitter}
                  </a>
                )}
              </div>

              <blockquote className="profile-quote large">{member.quote}</blockquote>

              <div className="profile-bio">
                <p>{member.bio}</p>
              </div>

              {/* Spotify Favorite Song */}
              {member.spotifyTrackId && (
                <div className="spotify-section" style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span className="font-mono" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", letterSpacing: "0.05em" }}>
                      LAGU FAVORIT
                    </span>
                  </div>
                  <div className="spotify-embed-wrapper card" style={{ borderRadius: 12, overflow: "hidden" }}>
                    <iframe
                      src={`https://open.spotify.com/embed/track/${member.spotifyTrackId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ borderRadius: 12, border: "none" }}
                    />
                  </div>
                </div>
              )}

              {/* YouTube Audio Player */}
              {member.favSong && (
                <div className="yt-audio-section" style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span className="font-mono" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", letterSpacing: "0.05em" }}>
                      LAGU FAVORIT
                    </span>
                  </div>

                  {/* Hidden YouTube iframe */}
                  <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                    {origin && (
                      <iframe
                        ref={ytRef}
                        onLoad={onIframeLoad}
                        src={`https://www.youtube.com/embed/${member.favSong.youtubeId}?enablejsapi=1&start=${member.favSong.startAt || 0}&autoplay=0&controls=0&origin=${origin}`}
                        width="1"
                        height="1"
                        allow="autoplay"
                        style={{ border: "none" }}
                      />
                    )}
                  </div>

                  {/* Custom Audio Player UI */}
                  <div className="yt-audio-player card" style={{ padding: "0", overflow: "hidden", display: "flex" }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "16px", gap: "16px", flex: 1, width: "100%" }}>
                      <button className="yt-play-btn" aria-label={ytPlaying ? "Pause" : "Play"} onClick={toggleYt}>
                        {ytPlaying ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        )}
                      </button>
                      <button
                        className="yt-reset-btn"
                        aria-label="Reset"
                        onClick={() => {
                          if (ytRef.current && ytRef.current.contentWindow && member.favSong) {
                            ytRef.current.contentWindow.postMessage(
                              JSON.stringify({
                                event: "command",
                                func: "seekTo",
                                args: [member.favSong.startAt || 0, true],
                              }),
                              "*",
                            );
                            setProgress(member.favSong.startAt || 0);
                          }
                        }}
                        style={{
                          marginLeft: 4,
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: "#e5e5e5",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          opacity: 0.85,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M10 3v2.5A5.5 5.5 0 1 1 4.5 11" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <polyline points="7 6 10 3 13 6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <div className="yt-song-info" style={{ flex: 1, minWidth: 0 }}>
                        <span className="yt-song-title font-display">{member.favSong.title}</span>
                        <span className="yt-song-artist font-mono">{member.favSong.artist}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {member.traits.map((trait, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 16px",
                      background: "var(--color-border)",
                      border: "1px solid var(--color-text-muted)",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      color: "var(--color-text)",
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
