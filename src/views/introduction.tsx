import { motion } from "motion/react";

interface IntroductionProps {
  askMe: () => void;
}

export function Introduction({ askMe }: IntroductionProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6 px-6 text-center">
      {/* Photo */}
      <motion.div
        initial={{ scale: 0, rotate: -6 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="relative"
      >
        {/* Glow behind the image */}
        <div className="absolute -inset-3 rounded-full bg-blue-400/20 blur-xl" />
        <motion.img
          src="/ade.jpeg"
          alt="Aderayo"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative w-48 rounded-2xl border-2 border-blue-400/30 shadow-lg shadow-blue-500/20"
        />
      </motion.div>

      {/* Greeting */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-elegant text-4xl md:text-5xl text-blue-200 tracking-wide"
      >
        Hey Aderayo...
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-lg text-blue-300/80 font-light"
      >
        I have a question for you 🥹
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
      />

      {/* Button */}
      <motion.button
        type="button"
        onClick={askMe}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.96 }}
        style={{ padding: "20px 56px" }}
        className="group relative mt-4 rounded-full text-white font-semibold text-base tracking-wider uppercase overflow-hidden cursor-pointer border border-blue-400/20"
      >
        {/* Shimmer layer */}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
        {/* Glass highlight */}
        <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-full" />
        {/* Glow ring */}
        <span className="absolute -inset-0.5 rounded-full bg-blue-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative z-10">oya, ask me 💙</span>
      </motion.button>
    </div>
  );
}
