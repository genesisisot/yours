import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MusicPlayer from './components/MusicPlayer';
import introImage from './assets/intro-image.jpg';
import singerInDenial from './assets/Singerindenial.m4a';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const bgAudioRef = React.useRef<HTMLAudioElement>(null);
  const audioStartedRef = React.useRef(false);

  useEffect(() => {
    // Try to autoplay on load after a short delay
    const timer = setTimeout(() => {
      if (bgAudioRef.current && !audioStartedRef.current) {
        bgAudioRef.current.volume = 0.5;
        bgAudioRef.current.play()
          .then(() => {
            audioStartedRef.current = true;
            console.log('Audio playing successfully on load');
          })
          .catch(err => {
            console.log('Autoplay prevented by browser - click anywhere to start audio:', err);
          });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const startAudio = () => {
    if (bgAudioRef.current && !audioStartedRef.current) {
      bgAudioRef.current.volume = 0.5;
      bgAudioRef.current.play()
        .then(() => {
          audioStartedRef.current = true;
          console.log('Audio playing successfully');
        })
        .catch(err => {
          console.log('Audio play failed:', err);
        });
    }
  };

  const skipIntro = () => {
    // Start audio if not started yet, then skip intro
    startAudio();
    setShowIntro(false);
    setShowMainContent(true);
  };

  const openMusicPlayer = () => {
    // Stop background music when opening music player
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
    }
    setShowMusicPlayer(true);
  };

  return (
    <div className="bg-black text-black leading-[normal] min-h-screen" style={{ fontFamily: '"Times New Roman"' }}>
      <div className="overflow-x-hidden overflow-y-auto">
        <div>
          <div>
            {/* Main Hero Section */}
            <AnimatePresence>
              {showMainContent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                  className="bg-center bg-cover box-content fixed left-0 top-0 right-0 bottom-0 bg-black pt-1 md:pt-16 pr-2 pb-1 md:pb-16 pl-2 z-[1000]"
                  style={{
                    backgroundImage: "url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F87e84226273c613c63877f5a945c2370a81c1973.avif?generation=1762803027041726&alt=media\")"
                  }}
                >
                  <div
                    className="h-screen pointer-events-none absolute w-screen left-0 bottom-0 z-[10]"
                    style={{
                      backgroundImage: "radial-gradient(49.111vw at 50vw 50vh, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.55))"
                    }}
                  ></div>
                  <div className="items-center flex flex-col size-full justify-center gap-12 md:gap-8 z-[2] px-1 md:px-4">
                    <motion.h1
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="relative w-fit z-[10]"
                    >
                      <div
                        className="font-normal text-center uppercase text-[rgb(248,_227,_192)] text-xl sm:text-6xl md:text-7xl lg:text-[96px] tracking-[0.5px] md:tracking-[0.96px] leading-[1.1]"
                        style={{
                          fontFamily: "kashmir, sans-serif",
                          textDecoration: "rgb(248, 227, 192)",
                          textShadow: "rgb(208, 149, 67) 0px 0px 7px, rgb(248, 227, 192) 0px 0px 10px, rgb(248, 227, 192) 0px 0px 21px, rgb(208, 149, 67) 0px 0px 30px"
                        }}
                      >
                        Welcome Beautiful
                      </div>
                      <span
                        className="block font-semibold text-center uppercase text-white text-lg sm:text-5xl md:text-6xl lg:text-[72px] mt-0 md:mt-2 leading-[1.1]"
                        style={{
                          fontFamily: "kashmir, sans-serif",
                          textDecoration: "rgb(255, 255, 255)"
                        }}
                      >
                        Lost Souls
                      </span>
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <p
                        className="text-center uppercase text-[rgb(254,_252,_231)] drop-shadow-[rgba(0,0,0,0.8)] text-[10px] sm:text-lg md:text-xl lg:text-[26px] leading-[1.2] px-1 md:px-4"
                        style={{
                          fontFamily: "Prompt, sans-serif",
                          textDecoration: "rgb(254, 252, 231)"
                        }}
                      >
                        Take a sit, Stare at the ocean and deep Dive in to the Heart of
                      </p>
                      <h1
                        className="font-black mix-blend-difference overflow-hidden text-center uppercase mt-0.5 md:mt-5 text-[rgb(255,_180,_51)] drop-shadow-[rgba(0,0,0,0.8)] text-2xl sm:text-6xl md:text-7xl lg:text-[100px] leading-[1.1]"
                        style={{
                          fontFamily: "Prompt, sans-serif",
                          textDecoration: "rgb(255, 180, 51)"
                        }}
                      >
                        Yours, Truly
                      </h1>
                      <h2
                        className="flex justify-center mix-blend-difference text-center uppercase mt-0 md:mt-[10px] text-[rgb(255,_180,_51)] drop-shadow-[rgba(0,0,0,0.8)] text-base sm:text-2xl md:text-3xl lg:text-[40px] leading-[1.1]"
                        style={{
                          fontFamily: "Prompt, sans-serif",
                          textDecoration: "rgb(255, 180, 51)"
                        }}
                      >
                        Genesis
                      </h2>
                    </motion.div>
                    <div className="items-center flex flex-col gap-1 md:gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="items-center box-content flex justify-center relative w-fit text-[rgb(22,_22,_19)] pt-1.5 md:pt-[9.6px] px-6 md:px-16 pb-1.5 md:pb-[9.6px] cursor-pointer"
                        style={{ textDecoration: "rgb(22, 22, 19)" }}
                        onClick={openMusicPlayer}
                      >
                        <div className="size-full absolute z-[-1]">
                          <img
                            src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F1e5af90e5e804c85201ce7060d6c51084d214de1.png?generation=1762803027079987&alt=media"
                            className="inline overflow-clip w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div
                          className="items-center flex font-bold justify-center uppercase text-sm sm:text-lg md:text-xl lg:text-[24px]"
                          style={{ fontFamily: "Prompt, sans-serif" }}
                        >
                          <p aria-label="Open your heart to the Sound" className="pointer-events-none uppercase whitespace-nowrap">
                            {["Open", "your", "heart", "to", "the", "Sound"].map((word, wordIndex) => (
                              <span key={wordIndex} className="inline-block">
                                {word.split("").map((char, charIndex) => (
                                  <motion.span
                                    key={charIndex}
                                    className="inline-block pointer-events-none relative uppercase"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                      delay: 1.2 + (wordIndex * word.length + charIndex) * 0.05,
                                      duration: 0.3
                                    }}
                                    style={{ textDecoration: "rgb(22, 22, 19)" }}
                                  >
                                    {char}
                                  </motion.span>
                                ))}
                                {wordIndex < 5 && " "}
                              </span>
                            ))}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="items-center flex gap-2"
                      >
                        <p
                          className="uppercase text-white drop-shadow-[rgba(0,0,0,0.8)] text-sm md:text-[17px] leading-tight"
                          style={{
                            fontFamily: "Prompt, sans-serif",
                            textDecoration: "rgb(255, 255, 255)"
                          }}
                        >
                          better with sound
                        </p>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          className="overflow-hidden align-middle w-[20px] md:w-[25px] h-[20px] md:h-[25px] mb-[2px] fill-white"
                        >
                          <img
                            src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fdde74d84ad2822a4f716853768f399994b70f19f.svg?generation=1762803027035710&alt=media"
                            className="block size-full"
                            alt="sound icon"
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Intro Video Section */}
            <AnimatePresence>
              {showIntro && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-screen overflow-hidden fixed w-screen left-0 top-0 right-0 bottom-0 bg-black z-[30]"
                >
                  {/* Background Image */}
                  <img
                    src={introImage}
                    className="size-full object-cover overflow-clip absolute left-0 top-0 z-[30]"
                    alt="Intro background"
                  />

                  {/* Centered Text Overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center z-[40] cursor-pointer"
                    onClick={startAudio}
                  >
                    <div className="flex flex-col items-center gap-4 md:gap-6">
                      <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-center px-4"
                        style={{
                          fontFamily: 'kashmir, sans-serif',
                          color: 'rgb(255, 180, 51)',
                          textShadow: '0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8), rgb(208, 149, 67) 0px 0px 10px, rgb(248, 227, 192) 0px 0px 15px, rgb(248, 227, 192) 0px 0px 30px, rgb(208, 149, 67) 0px 0px 42px',
                          position: 'relative',
                          zIndex: 50,
                        }}
                      >
                        Yours Truly, Genesis
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-center px-4"
                        style={{
                          fontFamily: 'Prompt, sans-serif',
                          color: 'rgb(255, 255, 255)',
                          textShadow: '0 0 15px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.8), rgb(208, 149, 67) 0px 0px 8px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        by AsingerMustDie
                      </motion.p>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.8 }}
                      className="absolute bottom-20 text-white/70 text-sm md:text-base uppercase tracking-wider"
                      style={{ fontFamily: 'Prompt, sans-serif' }}
                    >
                      Click anywhere to enable sound
                    </motion.p>
                  </div>
                  <div className="items-center flex flex-col size-full justify-center absolute left-0 bottom-0 gap-5 z-[30]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={skipIntro}
                      className="items-center flex flex-col justify-center fixed w-[80px] md:w-[100px] right-8 md:right-20 bottom-[5%] md:bottom-[3%] mt-10 z-[30] cursor-pointer"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="overflow-hidden absolute align-middle w-[170%] h-[170%] mb-[2px] fill-[rgb(255,_180,_51)] translate-x-[15%] translate-y-[16%] z-[0]"
                      >
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F752cfdca6b7a8eea687a9521ce46697bfbaec319.svg?generation=1762803027055040&alt=media"
                          className="block size-full"
                          alt=""
                        />
                      </motion.div>
                      <p
                        className="font-bold uppercase text-[rgb(255,_180,_51)] text-sm md:text-base lg:text-[19.2px] leading-tight z-[2] text-center"
                        style={{
                          fontFamily: "Prompt, sans-serif",
                          textDecoration: "rgb(255, 180, 51)"
                        }}
                      >
                        skip intro
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div></div>
          </div>
        </div>
        <div></div>
        <main></main>
      </div>

      {/* Music Player */}
      <AnimatePresence>
        {showMusicPlayer && (
          <MusicPlayer onClose={() => setShowMusicPlayer(false)} />
        )}
      </AnimatePresence>

      {/* Background Music */}
      <audio
        ref={bgAudioRef}
        src={singerInDenial}
        loop
        preload="auto"
      />
    </div>
  );
}