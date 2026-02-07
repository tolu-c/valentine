import { motion } from "motion/react";
import { useEffect, useRef, useMemo } from "react";

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

function CelebrationParticles() {
  const particles = useMemo<Particle[]>(() => {
    const emojis = ["💙", "✨", "🦋", "💎", "🤍", "⭐"];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 16 + Math.random() * 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.5],
            y: [0, -60, -120, -180],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export function Answer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current?.play().catch(() => {
      // Autoplay blocked — play on first user interaction
      const playOnInteract = () => {
        audioRef.current?.play();
        window.removeEventListener("click", playOnInteract);
      };
      window.addEventListener("click", playOnInteract);
      return () => window.removeEventListener("click", playOnInteract);
    });
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-6 px-6 text-center relative">
      <audio ref={audioRef} src="/ade.mp3" loop />
      <CelebrationParticles />

      {/* Big heart burst */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 12,
          delay: 0.1,
        }}
        className="text-8xl"
        style={{ filter: "drop-shadow(0 0 30px rgba(96, 165, 250, 0.6))" }}
      >
        💙
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="font-elegant text-4xl md:text-5xl text-blue-100 tracking-wide leading-snug"
      >
        You just made me
        <br />
        <span className="text-blue-300">the happiest</span>
      </motion.h2>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
      />

      {/* Thank you */}
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="font-val text-3xl text-blue-200"
      >
        Thank you, my love
      </motion.h4>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="text-blue-300/70 text-lg font-light max-w-sm leading-relaxed"
      >
        Every moment with you feels like magic ✨
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="text-blue-300/60 text-sm italic"
      >
        This song is for us. 🎵
      </motion.p>

      {/* Signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.7 }}
        className="mt-4 pt-4 border-t border-blue-400/20"
      >
        <p className="font-val text-2xl text-blue-200">
          Yours Forever, Tolu 💙
        </p>
      </motion.div>
    </div>
  );
}
