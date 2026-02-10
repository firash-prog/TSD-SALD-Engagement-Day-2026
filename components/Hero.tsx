import React, { useState, useRef, useEffect } from 'react';
import { Sunset, Wind, Volume2, VolumeX } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        // Adjusted for smoother parallax that keeps video well-positioned
        if (scrolled < window.innerHeight * 1.5) {
          parallaxRef.current.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Attempt to autoplay music on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set initial volume to be subtle

      const playAudio = async () => {
        try {
          await audio.play();
          setIsMusicPlaying(true);
        } catch (error) {
          console.log("Audio autoplay prevented or failed:", error);
          setIsMusicPlaying(false);
        }
      };

      playAudio();
    }
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        if (isMusicPlaying) {
          audio.pause();
          setIsMusicPlaying(false);
        } else {
          await audio.play();
          setIsMusicPlaying(true);
        }
      } catch (err) {
        console.error("Audio playback toggle failed:", err);
        setIsMusicPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden bg-oasis-sand">
      {/* Ambient Music */}
      <audio
        ref={audioRef}
        loop
        onError={() => setIsMusicPlaying(false)}
        src="https://cdn.pixabay.com/audio/2022/02/10/audio_fca92f2541.mp3"
      />

      {/* Video Background with Parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[160%] -top-[30%] overflow-hidden z-0 pointer-events-none will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1920&q=80"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Desert Tent Camp Aesthetic Video */}
          <source src="https://videos.pexels.com/video-files/3205808/3205808-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        {/* Subtle overlay to ensure text legibility without hiding the video */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Gradient fade at the bottom to blend seamlessly with the content section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-oasis-sand via-oasis-sand/60 to-transparent z-[1] pointer-events-none" />

      {/* Audio Control Only */}
      <div className="absolute bottom-8 right-6 z-20 flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <button
          onClick={toggleMusic}
          className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-oasis-blue hover:bg-oasis-blue hover:text-oasis-sand transition-all duration-300 shadow-sm hover:scale-105"
          aria-label={isMusicPlaying ? "Mute ambient music" : "Play ambient music"}
          title={isMusicPlaying ? "Mute Music" : "Play Music"}
        >
          {isMusicPlaying ? (
            <Volume2 size={18} fill="currentColor" className="opacity-90" />
          ) : (
            <VolumeX size={18} fill="currentColor" className="opacity-90" />
          )}
        </button>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up px-6 py-12">
        <div className="flex items-center justify-center gap-3 text-oasis-blue mb-4">
          <Wind className="w-6 h-6 animate-pulse" />
          <span className="uppercase tracking-[0.3em] text-sm font-semibold">Event Proposal</span>
          <Wind className="w-6 h-6 animate-pulse scale-x-[-1]" />
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-oasis-blue leading-tight drop-shadow-sm">
          TSD SALD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-oasis-blue to-oasis-gold">
            Engagement Day 2026
          </span>
        </h1>

        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-px w-24 bg-oasis-blue/40"></div>
          <Sunset className="text-oasis-gold w-10 h-10" />
          <div className="h-px w-24 bg-oasis-blue/40"></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-light text-oasis-blueLight tracking-[0.2em] uppercase">
          The Collective Oasis
        </h2>

        <p className="max-w-2xl mx-auto text-xl text-oasis-blue/90 mt-8 leading-relaxed font-light drop-shadow-sm">
          Event Proposal. A sanctuary of connection and celebration. Experience a vibrant serenity designed to refresh the spirit and strengthen bonds.
        </p>
      </div>
    </div>
  );
};