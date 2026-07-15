"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold progress bar fixed to the top of the viewport, tied to scroll. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-dim via-gold to-gold-bright origin-left z-[60]"
    />
  );
}
