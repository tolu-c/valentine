import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ValentineView, type ValentineViewType } from "./types/enums";
import { Introduction } from "./views/introduction";
import { ValQuestion } from "./views/val-question";
import { Answer } from "./views/answer";
import { FloatingHearts } from "./components/floating-hearts";

export function Question() {
  const [currentView, setCurrentView] = useState<ValentineViewType>(
    ValentineView.Introduction,
  );

  return (
    <div className="w-full min-h-dvh flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <FloatingHearts count={15} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full flex items-center justify-center"
        >
          {currentView === ValentineView.Introduction && (
            <Introduction
              askMe={() => setCurrentView(ValentineView.Question)}
            />
          )}
          {currentView === ValentineView.Question && (
            <ValQuestion yes={() => setCurrentView(ValentineView.Answer)} />
          )}
          {currentView === ValentineView.Answer && <Answer />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
