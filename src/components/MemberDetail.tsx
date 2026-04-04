"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Member } from "@/data/members";

export default function MemberDetail({ member }: { member: Member }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const glowWrapperRef = useRef<HTMLDivElement>(null);

  // Setup Web Audio API
  const setupAnalyser = useCallback(() => {
    if (!audioRef.current || audioCtxRef.current) return;

    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.65;
    analyser.minDecibels = -85;
    analyser.maxDecibels = -10;

    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
  }, []);

  // Glow animation loop — 3 separate frequency bands → 3 CSS custom properties
  // Now supports automatic BPM fallback if 'bpm' is defined instead of live Audio API tracking
  const startGlowLoop = useCallback(() => {
    if (!glowWrapperRef.current) return;

    if (member.favSong?.bpm) {
      // --------------------------------------------------------------------
      // MODE 1: BPM-BASED SYNC (Manual Timer)
      // --------------------------------------------------------------------
      const bpm = member.favSong.bpm;
      const beatDuration = 60 / bpm; // duration of one beat in seconds

      let smoothBass = 0;
      let smoothMid = 0;
      let smoothHigh = 0;

      const tick = () => {
        const audio = audioRef.current;
        const wrapper = glowWrapperRef.current;
        if (!audio || !wrapper) return;

        // Get phase of current beat (0.0 to 1.0)
        // Note: the audio.currentTime might need tweaking if the vocal doesn't align exactly at 0.0s.
        const phase = (audio.currentTime % beatDuration) / beatDuration;

        // Attack (0-15%), Decay (15%-100%)
        let intensity = 0;
        if (phase < 0.15) {
          intensity = phase / 0.15; // fade in fast (0 to 1)
        } else {
          intensity = 1 - ((phase - 0.15) / 0.85); // fade out
          intensity = Math.pow(intensity, 2.5); // steep exponential decay for punchy kick
        }

        const bassRaw = intensity;

        // Highs (hi-hats) pulse off-beat (offset by 0.5 beat)
        const highPhase = ((audio.currentTime + beatDuration * 0.5) % beatDuration) / beatDuration;
        let highIntensity = 0;
        if (highPhase < 0.1) {
          highIntensity = highPhase / 0.1;
        } else {
          highIntensity = Math.pow(1 - ((highPhase - 0.1) / 0.9), 2);
        }
        const highRaw = highIntensity * 0.7; // slightly lower intensity

        const midRaw = intensity * 0.6; // Mids follow the beat gently

        // Smooth output slightly to remove digital harshness
        smoothBass = bassRaw > smoothBass ? smoothBass * 0.1 + bassRaw * 0.9 : smoothBass * 0.85 + bassRaw * 0.15;
        smoothMid = midRaw > smoothMid ? smoothMid * 0.2 + midRaw * 0.8 : smoothMid * 0.88 + midRaw * 0.12;
        smoothHigh = highRaw > smoothHigh ? smoothHigh * 0.2 + highRaw * 0.8 : smoothHigh * 0.8 + highRaw * 0.2;

        wrapper.style.setProperty("--glow-bass", smoothBass.toFixed(3));
        wrapper.style.setProperty("--glow-mid", smoothMid.toFixed(3));
        wrapper.style.setProperty("--glow-high", smoothHigh.toFixed(3));
        wrapper.style.setProperty("--glow-bass-px", `${(3 + smoothBass * 10).toFixed(1)}px`);
        wrapper.style.setProperty("--glow-mid-px", `${(3 + smoothMid * 8).toFixed(1)}px`);
        wrapper.style.setProperty("--glow-high-px", `${(2 + smoothHigh * 7).toFixed(1)}px`);

        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);

    } else {
      // --------------------------------------------------------------------
      // MODE 2: WEB AUDIO API SYNC (Real-time Spectrum Analysis)
      // --------------------------------------------------------------------
      if (!analyserRef.current) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const freqData = new Uint8Array(bufferLength);

      let smoothBass = 0;
      let smoothMid = 0;
      let smoothHigh = 0;

      const tick = () => {
        const analyser = analyserRef.current;
        const wrapper = glowWrapperRef.current;
        if (!analyser || !wrapper) return;

        analyser.getByteFrequencyData(freqData);

        // === BASS (bins 1-12): kick drum, bass guitar, sub → ORANGE/YELLOW ===
        let bassSum = 0;
        for (let i = 1; i <= 12; i++) bassSum += freqData[i];
        const bassRaw = Math.min((bassSum / (12 * 255)) * 2.5, 1);

        // === MID (bins 13-60): vocals, guitar, snare, keys → PURPLE/PINK ===
        let midSum = 0;
        for (let i = 13; i <= 60; i++) midSum += freqData[i];
        const midRaw = Math.min((midSum / (48 * 255)) * 2.5, 1);

        // === HIGH (bins 61-140): hi-hat, cymbals, sparkle, sibilance → CYAN/BLUE ===
        const highEnd = Math.min(140, bufferLength);
        let highSum = 0;
        for (let i = 61; i < highEnd; i++) highSum += freqData[i];
        const highRaw = Math.min((highSum / ((highEnd - 61) * 255)) * 3, 1);

        // Smooth each band: rise FAST, fall FAST — more EQ-like snappy response
        smoothBass = bassRaw > smoothBass ? smoothBass * 0.15 + bassRaw * 0.85 : smoothBass * 0.75 + bassRaw * 0.25;
        smoothMid = midRaw > smoothMid ? smoothMid * 0.2 + midRaw * 0.8 : smoothMid * 0.78 + midRaw * 0.22;
        smoothHigh = highRaw > smoothHigh ? smoothHigh * 0.15 + highRaw * 0.85 : smoothHigh * 0.72 + highRaw * 0.28;

        // Set CSS custom properties on the wrapper
        // Opacity (0–1)
        wrapper.style.setProperty("--glow-bass", smoothBass.toFixed(3));
        wrapper.style.setProperty("--glow-mid", smoothMid.toFixed(3));
        wrapper.style.setProperty("--glow-high", smoothHigh.toFixed(3));
        // Dynamic spread in px — glow physically grows/shrinks like EQ bars
        wrapper.style.setProperty("--glow-bass-px", `${(3 + smoothBass * 10).toFixed(1)}px`);
        wrapper.style.setProperty("--glow-mid-px", `${(3 + smoothMid * 8).toFixed(1)}px`);
        wrapper.style.setProperty("--glow-high-px", `${(2 + smoothHigh * 7).toFixed(1)}px`);

        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);
    }
  }, [member.favSong]);

  const stopGlowLoop = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    // Reset CSS vars
    const wrapper = glowWrapperRef.current;
    if (wrapper) {
      wrapper.style.setProperty("--glow-bass", "0");
      wrapper.style.setProperty("--glow-mid", "0");
      wrapper.style.setProperty("--glow-high", "0");
      wrapper.style.setProperty("--glow-bass-px", "3px");
      wrapper.style.setProperty("--glow-mid-px", "3px");
      wrapper.style.setProperty("--glow-high-px", "2px");
    }
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setupAnalyser();
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
      stopGlowLoop();
      setIsPlaying(false);
    } else {
      if (member.favSong?.startAt && audio.currentTime < member.favSong.startAt) {
        audio.currentTime = member.favSong.startAt;
      }
      await audio.play();
      startGlowLoop();
      setIsPlaying(true);
    }
  }, [isPlaying, member.favSong, setupAnalyser, startGlowLoop, stopGlowLoop]);

  const handleReset = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !member.favSong) return;
    audio.currentTime = member.favSong.startAt || 0;
  }, [member.favSong]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      if (member.favSong?.startAt) audio.currentTime = member.favSong.startAt;
    };
    const onEnded = () => {
      stopGlowLoop();
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [member.favSong, stopGlowLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGlowLoop();
      audioCtxRef.current?.close();
    };
  }, [stopGlowLoop]);

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
            {/* Profile Photo — Glow lives here */}
            <div
              ref={glowWrapperRef}
              className={`vocal-glow-wrapper${isPlaying ? " glow-active" : ""}`}
            >
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
              {/* Extra glow layer for highs (cyan) — needs a real element */}
              <div className="glow-layer-high" />
            </div>

            <div className="profile-detail-info">
              <h1 className="font-display" style={{ fontSize: "3rem", marginBottom: 8 }}>
                {member.name}
              </h1>

              <div className="social-links-inline font-mono" style={{ marginBottom: 32 }}>
                {member.socials.instagram && (
                  <a
                    href={`https://instagram.com/${member.socials.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    IG: {member.socials.instagram}
                  </a>
                )}
                {member.socials.twitter && (
                  <a
                    href={`https://twitter.com/${member.socials.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    X: {member.socials.twitter}
                  </a>
                )}
              </div>

              <div className="profile-bio">
                <p>{member.bio}</p>
              </div>

              {/* Spotify Favorite Song */}
              {member.spotifyTrackId && (
                <div className="spotify-section" style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span
                      className="font-mono"
                      style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", letterSpacing: "0.05em" }}
                    >
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

              {/* Local Audio Player */}
              {member.favSong && (
                <div className="yt-audio-section" style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span
                      className="font-mono"
                      style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", letterSpacing: "0.05em" }}
                    >
                      LAGU FAVORIT
                    </span>
                  </div>

                  {/* Hidden native audio element */}
                  <audio ref={audioRef} src={member.favSong.audioSrc} preload="metadata" crossOrigin="anonymous" />

                  {/* Clean Minimal Audio Player */}
                  <div className="yt-audio-player" style={{ padding: 0, overflow: "hidden" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                      }}
                    >
                      {/* Play / Pause */}
                      <button
                        className="yt-play-btn"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        onClick={togglePlay}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "var(--color-accent)",
                          border: "none",
                          color: "var(--color-bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "transform 0.2s ease, opacity 0.2s ease",
                        }}
                      >
                        {isPlaying ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        )}
                      </button>

                      {/* Song Info */}
                      <div className="yt-song-info" style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <span className="yt-song-title font-display" style={{ fontSize: '1.2rem', margin: 0 }}>{member.favSong.title}</span>
                          <span className="yt-song-artist font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{member.favSong.artist}</span>
                        </div>
                      </div>

                      {/* Reset to startAt */}
                      <button
                        className="yt-reset-btn"
                        aria-label="Reset"
                        onClick={handleReset}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "transparent",
                          border: "1px solid var(--color-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          opacity: 0.6,
                          flexShrink: 0,
                          transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                      >
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 3v2.5A5.5 5.5 0 1 1 4.5 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="7 6 10 3 13 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
