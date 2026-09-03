import React, { useState, useEffect, useRef } from 'react';
import { MediaType } from '../types/quiz';
import { Volume2, Play, AlertCircle, Sparkles, FastForward } from 'lucide-react';

interface MediaRendererProps {
  type: MediaType;
  media: string | null;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({
  type,
  media,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setHasError(false);
    setIsPlaying(false);
    setAutoplayBlocked(false);
    setAudioProgress(0);

    if (type === 'none' || !media) {
      return;
    }

    if (type === 'audio') {
      const delayHandle = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch(() => {
              setAutoplayBlocked(true);
              setIsPlaying(false);
            });
        }
      }, 100);
      return () => clearTimeout(delayHandle);
    }

    if (type === 'video') {
      const delayHandle = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play()
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch(() => {
              setAutoplayBlocked(true);
              setIsPlaying(false);
            });
        }
      }, 100);
      return () => clearTimeout(delayHandle);
    }
  }, [media, type]);

  const handleManualPlay = () => {
    setAutoplayBlocked(false);
    if (type === 'audio' && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else if (type === 'video' && videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleEnd = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  if (type === 'none' || !media) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-3 flex flex-col items-center justify-center">
      {hasError ? (
        <div className="w-full h-44 rounded-2xl bg-dark-850 border border-white/10 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
          <AlertCircle className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
          <p className="text-sm font-medium text-slate-300">Media asset preview unavailable</p>
          <p className="text-xs text-slate-500 mt-1">Please select your option below.</p>
        </div>
      ) : (
        <>
          {type === 'image' && (
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-dark-900 group">
              <img
                src={media}
                alt="Brainrot quiz artifact"
                loading="eager"
                onError={handleError}
                className="w-full max-h-[320px] sm:max-h-[380px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          )}

          {type === 'audio' && (
            <div className="w-full rounded-2xl glass-panel border border-brand-violet/20 p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <audio
                ref={audioRef}
                src={media}
                preload="auto"
                onTimeUpdate={(e) => {
                  const audio = e.currentTarget;
                  if (audio.duration) {
                    setAudioProgress((audio.currentTime / audio.duration) * 100);
                  }
                }}
                onEnded={handleEnd}
                onError={handleError}
              />

              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-violet to-brand-cyan flex items-center justify-center shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}>
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan"></span>
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                    AUDIO IDENTIFICATION SAMPLE
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isPlaying 
                      ? "Listening to audio cue..."
                      : autoplayBlocked
                      ? "Browser blocked autoplay. Click Play to listen."
                      : "Audio clip completed."}
                  </p>
                </div>

                <div className="w-full max-w-md bg-dark-900/80 rounded-full h-2 overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-100"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  {autoplayBlocked && (
                    <button
                      onClick={handleManualPlay}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition shadow-lg shadow-brand-violet/25"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Play Audio Clip
                    </button>
                  )}

                  {isPlaying && (
                    <button
                      onClick={handleEnd}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white font-mono text-[11px] transition border border-white/5"
                      title="Stop Audio"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Stop Audio</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {type === 'video' && (
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <video
                ref={videoRef}
                src={media}
                playsInline
                muted={false}
                preload="auto"
                onEnded={handleEnd}
                onError={handleError}
                className="w-full max-h-[300px] object-contain mx-auto"
              />

              {autoplayBlocked && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                  <button
                    onClick={handleManualPlay}
                    className="w-14 h-14 rounded-full bg-brand-violet hover:bg-brand-violet/90 flex items-center justify-center text-white shadow-xl shadow-brand-violet/40 transition-transform transform hover:scale-105 mb-2"
                    aria-label="Play video"
                  >
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </button>
                  <p className="text-xs text-slate-300 font-medium">Click to watch video clip</p>
                </div>
              )}

              {isPlaying && (
                <div className="absolute top-3 right-3">
                  <button
                    onClick={handleEnd}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md text-slate-300 hover:text-white font-mono text-[10px] border border-white/10 transition"
                  >
                    <FastForward className="w-3 h-3" />
                    <span>Stop Video</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
