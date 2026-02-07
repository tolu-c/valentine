import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ValQuestionProps {
  yes: () => void;
}

const noResponses = [
  "no",
  "really, no? 🥺",
  "fr? Ade? no?",
  "my chest hurts 💔",
  "please reconsider...",
  "i'll cry 😭",
];

export function ValQuestion({ yes }: ValQuestionProps) {
  const [noCount, setNoCount] = useState(0);

  const yesScale = 1 + noCount * 0.25;
  const noScale = Math.max(0.5, 1 - noCount * 0.1);
  const reachedEnd = noCount >= noResponses.length;

  function handleNo() {
    if (!reachedEnd) {
      setNoCount((prev) => prev + 1);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-8 px-6 text-center">
      {/* Heart icon */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-6xl"
        style={{ filter: "drop-shadow(0 0 20px rgba(96, 165, 250, 0.5))" }}
      >
        💙
      </motion.div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="font-elegant text-4xl md:text-5xl text-blue-100 tracking-wide leading-tight">
          Will you be my Valentine,
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 font-val text-2xl md:text-3xl text-blue-300"
        >
          my baby girl? 💫
        </motion.p>
      </motion.div>

      {/* Reaction text when she keeps saying no */}
      <AnimatePresence mode="wait">
        {noCount > 0 && !reachedEnd && (
          <motion.p
            key={noCount}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-blue-300/70 text-sm italic"
          >
            {noCount >= 3
              ? "the yes button is getting bigger... just saying 👀"
              : "are you sure about that? 🤔"}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <motion.button
          type="button"
          onClick={yes}
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: yesScale * 1.08, y: -3 }}
          whileTap={{ scale: yesScale * 0.96 }}
          style={{ padding: "20px 56px" }}
          className="group relative rounded-full text-white font-semibold text-base tracking-wider uppercase overflow-hidden cursor-pointer border border-blue-400/20"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
          <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-full" />
          <span className="absolute -inset-1 rounded-full bg-blue-400/25 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">Yes! 💙</span>
        </motion.button>

        <AnimatePresence>
          {!reachedEnd && (
            <motion.button
              type="button"
              onClick={handleNo}
              animate={{ scale: noScale }}
              exit={{
                opacity: 0,
                scale: 0,
                rotate: 90,
                transition: { duration: 0.4 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: noScale * 1.05 }}
              whileTap={{ scale: noScale * 0.9 }}
              style={{ padding: "20px 40px" }}
              className="group relative rounded-full text-blue-200/90 font-medium tracking-wide overflow-hidden cursor-pointer backdrop-blur-md border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              {/* Subtle inner glow */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent" />
              <span className="relative z-10">{noResponses[noCount]}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
