"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Appears bottom-right once the hero has scrolled out of view. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#hero"
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#123DFF] text-white shadow-[0_10px_30px_rgba(18,61,255,0.45)] transition-colors duration-300 hover:bg-[#EAFF45] hover:text-[#141824] md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.92 }}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 transition-transform duration-300 group-hover:-translate-y-1">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
