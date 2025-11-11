import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, X, Volume2, Mail } from 'lucide-react';
import albumCover from 'figma:asset/d119b6386dc5275b9d90bef80965acd58bfbf8f7.png';
import singerInDenial from '../assets/Singerindenial.m4a';
import balladOfTheLost from '../assets/Balladofthelost.m4a';
import polaroids from '../assets/Polarioid.m4a';
import fallenAngel from '../assets/Fallenangel.m4a';
import yoursTrulyGenesis from '../assets/YourstrulyGenesis.m4a';
import stupidRecklessLove from '../assets/Stupidrecklesslovr.m4a';

interface Song {
  title: string;
  artist: string;
  url: string;
  lyrics: string;
}

interface MusicPlayerProps {
  onClose: () => void;
}

export default function MusicPlayer({ onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [rotation, setRotation] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Retro Sound Effects using Web Audio API
  const playRetroSound = (type: 'click' | 'play' | 'pause' | 'skip' | 'select' | 'toggle') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sound characteristics for different button types
    switch(type) {
      case 'play':
        // Ascending beep for play
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.type = 'square';
        break;
      
      case 'pause':
        // Descending beep for pause
        oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.type = 'square';
        break;
      
      case 'skip':
        // Quick double beep for skip
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.12, audioContext.currentTime + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.type = 'triangle';
        break;
      
      case 'select':
        // Crisp high beep for selection
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        oscillator.type = 'sine';
        break;
      
      case 'toggle':
        // Toggle switch sound
        oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.type = 'square';
        break;
      
      case 'click':
      default:
        // Standard click sound
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.type = 'sine';
        break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const [songs] = useState<Song[]>([
    {
      title: "A Singer in Denial",
      artist: "AsingerMustDie",
      url: singerInDenial,
      lyrics: `hope you're doing fine, I hope they treat you right. I hope the bridges burn, I hope your name's a blur.
Forgive me if I'm rude — Well, what are you waiting for? I was just a fool; For you, I went through hell.
So let the bridges Burn, burn, burn to ashes. Baby, I'm still standing, I'm still falling For you, baby. Can't explain it, Can't replace the feeling.
Forgive me if I'm rude — You really left me no choice. I'm coining this to you, I'm writing this for you. Oh baby, this is my last.
Oh, this is my best. I don't care if it's good enough, I don't care if it's even good.
But baby, I'll burn, burn, burnnnn… Baby, I'd burnnnnnnnn.
Forgive me if I'm rude — You left me no choice. I'm just a singer in denial, A singer in denial.`
    },
    {
      title: "Ballad of the Lost",
      artist: "AsingerMustDie",
      url: balladOfTheLost,
      lyrics: `I wish you well, I took pills to move on. One more drink, I'd be fine— Ten more, then I'm dead.
I remember your kiss, Remember your touch. I couldn't tell you, You left me to die.
But I smiled, But I waved. At your essence, It's bliss.
It's a pleasure To make your acquaintance again. Wish I did, Wish I told you— You left me to die.
The pain I've felt is blissful.
All things equal, Nothing matters. I love youuuuuuuu— Don't you see it?
Don't you hear it
Don't you understand
I'm tired
I'm so tired`
    },
    {
      title: "Polaroids",
      artist: "AsingerMustDie",
      url: polaroids,
      lyrics: `Heart is black, Look what you Made me do.
I'd be damned, Curse my name — Do you care All the same?
Why are you so cruel? Let me go, my dear. I can't fall, Fall in love anymore.
Gave it all, All for you. So get far away from me — All because Of your stare. I'm a weak soul When you're here.
If you care All the same,
You will run, You will run away from me. Please move on, Move on far away. My aching heart can't deal with your love — Let it burn, Let it break, Just go away.`
    },
    {
      title: "Fallen Angel",
      artist: "AsingerMustDie",
      url: fallenAngel,
      lyrics: `Calling you every day, Missing you, Wishing that I died alone. Baby, please call me back — I'm insane.
I've been there, On the plane, When you jumped, Trust me, I'd be right behind — On your back, In the air.
Baby, it's Friday, It's Friday. Please do call me when you're back.
It's your birthday, Understand me — Baby, why don't you write back?
I'm trying to change,
Genesis.
You hold me back, Leave me alone.
I'm making it alone, It's too late.
Leave me alone, Genesis.
Baby, please — It's too late.
I won't leave you, please... Don't come back.`
    },
    {
      title: "Yours Truly Genesis",
      artist: "AsingerMustDie",
      url: yoursTrulyGenesis,
      lyrics: `My lovely, pretty Heiwa, Hold my hand — you will find peace. Follow me to the stars.
Oh Maria, Bless you on your career. When I get home, We'll laugh, we'll dance, we'll crash — I'll be there soon.
Oh my Sheila, Bet that you won't remember That I wasn't all bad. I changed — who cares, hope you're doing fineeee.
It's yours truly, Yours truly, Genesis. Led by frail insecurities, But I promise, I try.
I tried with Wura — She's a damsel, she's pure class. It was me and her against the world — What a dream that would be.
My Tweedle, Oh my pretty Tweedledee, Love was something I learned from you. Be my Tweedle for life.`
    },
    {
      title: "Stupid Reckless Love",
      artist: "AsingerMustDie",
      url: stupidRecklessLove,
      lyrics: `And I don't see you anymore, In places that I've been.
And life's so complicated — It's crazy. I'm hoping that I hold your hand.
Gimme that loving, I'd be your boyfriend. Baby, I'm stupid — You say, "Don't bother."
I'd be on speed, babe, Gimme a ticket. Spend the night in my life, Morning, you're away.
Tell me you love me, I'd be your captain. I'd be stupid, You'd be crazy.
We are barely In denial. I've got cancer In my lungs.
And youuu — Lately, Got a lover's mind.`
    }
  ]);

  const currentSong = songs[currentSongIndex];

  // Vinyl rotation animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextSong();
    const handleError = (e: Event) => {
      console.error('Audio loading error for', currentSong.title, ':', e);
      console.error('Audio src:', audio.src);
      console.error('Audio error:', audio.error);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset audio when song changes
    console.log('Loading song:', currentSong.title, currentSong.url);
    audio.load();

    // Auto-play if isPlaying is true
    if (isPlaying) {
      // Wait for the audio to be loaded before playing
      const handleCanPlay = () => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Playing:', currentSong.title);
            })
            .catch(error => {
              console.error('Playback prevented for', currentSong.title, ':', error);
              setIsPlaying(false);
            });
        }
        audio.removeEventListener('canplay', handleCanPlay);
      };

      audio.addEventListener('canplay', handleCanPlay);

      // Fallback: try to play after a short delay if canplay doesn't fire
      setTimeout(() => {
        if (audio.paused && isPlaying) {
          audio.play().catch(err => console.error('Delayed play failed:', err));
        }
      }, 500);
    }
  }, [currentSongIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        playRetroSound('pause');
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              playRetroSound('play');
            })
            .catch(error => {
              console.log('Playback prevented:', error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const nextSong = () => {
    playRetroSound('skip');
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    playRetroSound('skip');
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[2000] overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: "url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F87e84226273c613c63877f5a945c2370a81c1973.avif?generation=1762803027041726&alt=media\")",
        perspective: '2000px',
      }}
    >
      {/* Film Grain / Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-[50] opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          animation: 'grain 0.5s steps(2) infinite',
        }}
      />

      {/* VHS Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none z-[45] opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
          animation: 'scanlines 10s linear infinite',
        }}
      />

      {/* Same radial gradient overlay as landing page */}
      <div
        className="h-screen pointer-events-none absolute w-screen left-0 bottom-0 z-[10]"
        style={{
          backgroundImage: "radial-gradient(49.111vw at 50vw 50vh, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.55))"
        }}
      ></div>

      {/* Add keyframes for animations */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
      
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="fixed top-6 md:top-8 right-6 md:right-8 z-50 text-[rgb(255,180,51)] hover:text-white transition-colors"
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
      </motion.button>

      {/* Main Player */}
      <div className="relative z-10 h-full flex items-center justify-center p-3 md:p-12 overflow-y-auto">
        <div className="w-full max-w-5xl my-6 md:my-12">
          
          {/* EP Title */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", damping: 15 }}
            className="text-center mb-4 md:mb-12"
          >
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-none"
              style={{ 
                fontFamily: 'kashmir, sans-serif',
                fontWeight: 'normal',
                color: 'rgb(255, 180, 51)',
                textShadow: 'rgb(208, 149, 67) 0px 0px 10px, rgb(248, 227, 192) 0px 0px 15px, rgb(248, 227, 192) 0px 0px 30px, rgb(208, 149, 67) 0px 0px 42px',
              }}
              animate={{
                textShadow: [
                  'rgb(208, 149, 67) 0px 0px 10px, rgb(248, 227, 192) 0px 0px 15px, rgb(248, 227, 192) 0px 0px 30px, rgb(208, 149, 67) 0px 0px 42px',
                  'rgb(208, 149, 67) 0px 0px 15px, rgb(248, 227, 192) 0px 0px 20px, rgb(248, 227, 192) 0px 0px 40px, rgb(208, 149, 67) 0px 0px 55px',
                  'rgb(208, 149, 67) 0px 0px 10px, rgb(248, 227, 192) 0px 0px 15px, rgb(248, 227, 192) 0px 0px 30px, rgb(208, 149, 67) 0px 0px 42px',
                ]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              Yours Truly, Genesis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-xl md:text-2xl mt-2 md:mt-4 uppercase tracking-widest"
              style={{ 
                fontFamily: 'Prompt, sans-serif',
                color: 'rgb(254, 252, 231)',
                textShadow: '0 0 10px rgba(255,180,51,0.3)',
              }}
            >
              An EP by AsingerMustDie
            </motion.p>
          </motion.div>

          {/* 3D Turntable */}
          <motion.div
            initial={{ rotateX: 20, y: 100, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", damping: 20 }}
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Main Player Body */}
            <div 
              className="relative bg-gradient-to-br from-zinc-900/10 via-zinc-800/5 to-zinc-900/10 backdrop-blur-[2px] rounded-2xl p-5 md:p-8 border border-zinc-700/10"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                boxShadow: `
                  0 50px 100px rgba(0,0,0,0.5),
                  inset 0 2px 10px rgba(255,255,255,0.02),
                  inset 0 -4px 20px rgba(0,0,0,0.2)
                `,
              }}
            >
              {/* Brushed metal texture */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                  backgroundSize: '20px 100%',
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">

                {/* LEFT: Vinyl Turntable */}
                <div className="flex justify-center items-center relative z-20">
                  <div
                    className="relative"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Turntable Platter Base */}
                    <div
                      className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-4 border-zinc-700"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(20px)',
                        boxShadow: `
                          0 20px 60px rgba(0,0,0,0.9),
                          inset 0 2px 10px rgba(255,255,255,0.15),
                          inset 0 -5px 20px rgba(0,0,0,0.7)
                        `,
                      }}
                    >
                      {/* Platter mat */}
                      <div
                        className="absolute inset-4 rounded-full bg-gradient-to-br from-zinc-900 to-black"
                        style={{
                          boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.9), inset 0 -2px 10px rgba(255,255,255,0.1)',
                        }}
                      >
                        {/* Vinyl Record */}
                        <motion.div
                          className="absolute inset-2 rounded-full bg-black overflow-hidden"
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            transformStyle: 'preserve-3d',
                            boxShadow: `
                              0 10px 30px rgba(0,0,0,0.8),
                              inset 0 0 40px rgba(0,0,0,0.9),
                              inset 0 2px 5px rgba(255,255,255,0.1)
                            `,
                          }}
                          animate={{
                            boxShadow: isPlaying
                              ? [
                                  '0 10px 30px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.9)',
                                  '0 10px 30px rgba(255,180,51,0.3), inset 0 0 40px rgba(255,180,51,0.1)',
                                  '0 10px 30px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.9)',
                                ]
                              : '0 10px 30px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.9)'
                          }}
                          transition={{ repeat: Infinity, duration: 3 }}
                        >
                          {/* Vinyl grooves */}
                          <div className="absolute inset-0 opacity-40">
                            {[...Array(15)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute rounded-full border border-white/10"
                                style={{
                                  inset: `${8 + i * 6}%`,
                                }}
                              />
                            ))}
                          </div>

                          {/* Album cover in center */}
                          <div
                            className="absolute inset-[25%] rounded-full overflow-hidden"
                            style={{
                              boxShadow: '0 5px 20px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.5)',
                            }}
                          >
                            <img
                              src={albumCover}
                              alt="Album Cover"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                          </div>

                          {/* Center spindle hole */}
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-950"
                            style={{
                              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9)',
                            }}
                          />

                          {/* Vinyl shine/reflection */}
                          <div
                            className="absolute inset-0 rounded-full opacity-20"
                            style={{
                              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 45%, transparent 50%, transparent 100%)',
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Center spindle */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-12 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-full z-10"
                        style={{
                          transform: 'translateZ(30px) translateX(-50%) translateY(-50%)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.8)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: 3D Controls */}
                <div className="space-y-3 md:space-y-4 relative z-10">
                  
                  {/* Song Info Display - LCD Screen Style */}
                  <motion.div
                    initial={{ rotateX: -20, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-gradient-to-br from-emerald-950/40 to-teal-950/30 backdrop-blur-[2px] rounded-xl p-3 md:p-4 border border-zinc-700/20"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(30px)',
                      boxShadow: `
                        0 10px 40px rgba(0,0,0,0.6),
                        inset 0 2px 10px rgba(16,185,129,0.2),
                        inset 0 0 40px rgba(0,0,0,0.3)
                      `,
                    }}
                  >
                    {/* LCD Scanlines */}
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none rounded-xl"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16,185,129,0.1) 2px, rgba(16,185,129,0.1) 4px)',
                      }}
                    />
                    
                    <motion.h2
                      key={currentSongIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-xl md:text-2xl lg:text-3xl uppercase leading-tight mb-1"
                      style={{ 
                        fontFamily: 'kashmir, sans-serif',
                        fontWeight: 'normal',
                        color: 'rgb(255, 180, 51)',
                        textShadow: 'rgb(208, 149, 67) 0px 0px 7px, rgb(248, 227, 192) 0px 0px 10px, rgb(248, 227, 192) 0px 0px 21px, rgb(208, 149, 67) 0px 0px 30px',
                      }}
                    >
                      {currentSong.title}
                    </motion.h2>
                    <motion.p
                      key={`artist-${currentSongIndex}`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-base md:text-lg"
                      style={{ 
                        fontFamily: 'Prompt, sans-serif',
                        color: 'rgb(254, 252, 231)',
                        textShadow: '0 0 10px rgba(16,185,129,0.5)',
                      }}
                    >
                      {currentSong.artist}
                    </motion.p>
                  </motion.div>

                  {/* Progress Bar - 3D */}
                  <div 
                    className="space-y-1"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(20px)',
                    }}
                  >
                    <div 
                      className="relative h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-700"
                      style={{
                        boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.8), 0 2px 5px rgba(0,0,0,0.5)',
                      }}
                    >
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[rgb(255,180,51)] via-[rgb(255,220,120)] to-[rgb(255,180,51)]"
                        style={{
                          width: `${(currentTime / duration) * 100 || 0}%`,
                          boxShadow: '0 0 20px rgba(255,180,51,0.8), inset 0 1px 3px rgba(255,255,255,0.5)',
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-white/70 font-mono">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Main 3D Control Buttons */}
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    {/* Previous Button */}
                    <motion.button
                      onClick={prevSong}
                      whileHover={{ scale: 1.05, translateZ: 10 }}
                      whileTap={{ scale: 0.95, translateZ: -5 }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-zinc-600 flex items-center justify-center relative overflow-hidden group"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(30px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.2)',
                      }}
                    >
                      <div className="absolute inset-0 bg-[rgb(255,180,51)]/0 group-hover:bg-[rgb(255,180,51)]/20 transition-all" />
                      <SkipBack className="w-5 h-5 md:w-6 md:h-6 text-[rgb(255,180,51)] relative z-10" fill="rgb(255,180,51)" />
                    </motion.button>

                    {/* Play/Pause Button - Big 3D */}
                    <motion.button
                      onClick={togglePlay}
                      whileHover={{ scale: 1.05, translateZ: 15 }}
                      whileTap={{ scale: 0.95, translateZ: -10 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[rgb(255,220,120)] via-[rgb(255,180,51)] to-[rgb(208,149,67)] border-3 border-amber-600 flex items-center justify-center relative overflow-hidden shadow-2xl"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(50px)',
                        boxShadow: `
                          0 15px 50px rgba(255,180,51,0.6),
                          0 8px 30px rgba(0,0,0,0.9),
                          inset 0 3px 10px rgba(255,255,255,0.4),
                          inset 0 -3px 10px rgba(0,0,0,0.3)
                        `,
                      }}
                      animate={{
                        boxShadow: isPlaying 
                          ? [
                              '0 15px 50px rgba(255,180,51,0.6), 0 8px 30px rgba(0,0,0,0.9)',
                              '0 15px 50px rgba(255,180,51,1), 0 8px 30px rgba(0,0,0,0.9)',
                              '0 15px 50px rgba(255,180,51,0.6), 0 8px 30px rgba(0,0,0,0.9)',
                            ]
                          : '0 15px 50px rgba(255,180,51,0.6), 0 8px 30px rgba(0,0,0,0.9)'
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {/* Metallic shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl" />
                      
                      {isPlaying ? (
                        <Pause className="w-8 h-8 md:w-10 md:h-10 text-black relative z-10" fill="black" strokeWidth={3} />
                      ) : (
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1 relative z-10" fill="black" strokeWidth={3} />
                      )}
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                      onClick={nextSong}
                      whileHover={{ scale: 1.05, translateZ: 10 }}
                      whileTap={{ scale: 0.95, translateZ: -5 }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-zinc-600 flex items-center justify-center relative overflow-hidden group"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(30px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.2)',
                      }}
                    >
                      <div className="absolute inset-0 bg-[rgb(255,180,51)]/0 group-hover:bg-[rgb(255,180,51)]/20 transition-all" />
                      <SkipForward className="w-5 h-5 md:w-6 md:h-6 text-[rgb(255,180,51)] relative z-10" fill="rgb(255,180,51)" />
                    </motion.button>
                  </div>

                  {/* Volume Control - 3D Knob Style */}
                  <div 
                    className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm rounded-xl p-2 border border-zinc-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(20px)',
                      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.5)',
                    }}
                  >
                    <Volume2 className="w-4 h-4 text-[rgb(255,180,51)]" />
                    <div className="flex-1 relative h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-700">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[rgb(255,180,51)] to-[rgb(255,220,120)]"
                        style={{
                          width: `${volume * 100}%`,
                          boxShadow: '0 0 15px rgba(255,180,51,0.8), inset 0 1px 2px rgba(255,255,255,0.3)',
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-xs text-white/70 font-mono w-8 text-right">{Math.round(volume * 100)}%</span>
                  </div>

                  {/* Track Selection - 3D Buttons */}
                  <div className="flex gap-2 justify-center items-center">
                    <span className="text-white/50 text-sm uppercase tracking-wider" style={{ fontFamily: 'Prompt, sans-serif' }}>Track:</span>
                    {songs.map((song, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          playRetroSound('select');
                          setCurrentSongIndex(index);
                          setIsPlaying(true);
                        }}
                        whileHover={{ scale: 1.1, translateZ: 10 }}
                        whileTap={{ scale: 0.9, translateZ: -5 }}
                        className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all ${
                          currentSongIndex === index
                            ? 'bg-gradient-to-br from-[rgb(255,220,120)] to-[rgb(255,180,51)] text-black border-2 border-amber-600'
                            : 'bg-gradient-to-br from-zinc-700 to-zinc-900 text-white/70 border-2 border-zinc-600'
                        }`}
                        style={{ 
                          fontFamily: 'Prompt, sans-serif',
                          fontWeight: 'bold',
                          transformStyle: 'preserve-3d',
                          transform: 'translateZ(20px)',
                          boxShadow: currentSongIndex === index
                            ? '0 0 25px rgba(255,180,51,0.8), 0 5px 15px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.3)'
                            : '0 5px 15px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.1)',
                        }}
                      >
                        {index + 1}
                      </motion.button>
                    ))}
                  </div>

                  {/* Lyrics Button - 3D */}
                  <motion.button
                    onClick={() => {
                      playRetroSound('toggle');
                      setShowLyrics(!showLyrics);
                    }}
                    whileHover={{ scale: 1.05, translateZ: 10 }}
                    whileTap={{ scale: 0.95, translateZ: -5 }}
                    className={`w-full py-2 md:py-3 rounded-xl text-sm md:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      showLyrics
                        ? 'bg-gradient-to-br from-[rgb(255,220,120)] to-[rgb(255,180,51)] text-black border-2 border-amber-600'
                        : 'bg-gradient-to-br from-zinc-700 to-zinc-900 text-white border-2 border-zinc-600'
                    }`}
                    style={{ 
                      fontFamily: 'Prompt, sans-serif',
                      fontWeight: 'bold',
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(25px)',
                      boxShadow: showLyrics
                        ? '0 0 30px rgba(255,180,51,0.8), 0 8px 25px rgba(0,0,0,0.8), inset 0 2px 8px rgba(255,255,255,0.3)'
                        : '0 8px 25px rgba(0,0,0,0.8), inset 0 2px 8px rgba(255,255,255,0.1)',
                    }}
                  >
                    <span>{showLyrics ? '✕' : '♪'}</span>
                    <span>{showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}</span>
                  </motion.button>

                  {/* Message Artist Button - 3D */}
                  <motion.a
                    href="mailto:asingermustdie355@gmail.com"
                    whileHover={{ scale: 1.05, translateZ: 10 }}
                    whileTap={{ scale: 0.95, translateZ: -5 }}
                    className="w-full py-2 md:py-3 rounded-xl text-sm md:text-base uppercase tracking-wider transition-all bg-gradient-to-br from-amber-700 to-orange-900 text-white border-2 border-amber-600 flex items-center justify-center gap-2"
                    style={{ 
                      fontFamily: 'Prompt, sans-serif',
                      fontWeight: 'bold',
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(25px)',
                      boxShadow: '0 0 30px rgba(251,191,36,0.6), 0 8px 25px rgba(0,0,0,0.8), inset 0 2px 8px rgba(255,255,255,0.2)',
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    Message Artist
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lyrics Panel - 3D Floating */}
          <AnimatePresence mode="wait">
            {showLyrics && (
              <motion.div
                initial={{ rotateX: -30, y: 50, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 0, y: 0, opacity: 1, scale: 1 }}
                exit={{ rotateX: 30, y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20 }}
                className="mt-8 bg-gradient-to-br from-zinc-900/30 via-zinc-800/20 to-zinc-900/30 backdrop-blur-sm rounded-3xl p-6 md:p-10 border-4 border-zinc-700/30 relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(40px)',
                  boxShadow: `
                    0 30px 80px rgba(0,0,0,0.9),
                    0 0 60px rgba(255,180,51,0.2),
                    inset 0 2px 10px rgba(255,255,255,0.05),
                    inset 0 0 40px rgba(255,180,51,0.03)
                  `,
                }}
              >
                <div className="text-center mb-6">
                  <h3
                    className="text-3xl md:text-4xl font-black text-[rgb(255,180,51)] uppercase mb-2 flex items-center justify-center gap-3"
                    style={{ 
                      fontFamily: "kashmir, sans-serif",
                      textShadow: '0 0 30px rgba(255,180,51,0.8), 0 2px 20px rgba(255,180,51,0.5)'
                    }}
                  >
                    <span className="text-5xl">♪</span>
                    {currentSong.title}
                  </h3>
                  <p className="text-white/70 text-xl" style={{ fontFamily: "Prompt, sans-serif" }}>
                    {currentSong.artist}
                  </p>
                </div>

                <motion.div
                  key={currentSongIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 max-h-[40vh] overflow-y-auto pr-4"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgb(255,180,51) transparent',
                  }}
                >
                  {currentSong.lyrics.split('\n').map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-white/90 text-lg md:text-xl leading-relaxed text-center"
                      style={{ fontFamily: "Prompt, sans-serif" }}
                    >
                      {line || '\u00A0'}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <audio ref={audioRef} src={currentSong.url} />
    </motion.div>
  );
}