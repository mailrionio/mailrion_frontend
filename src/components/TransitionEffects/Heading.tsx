import { motion } from "framer-motion";
import React from "react";
interface headingEffectProps {
  children: React.ReactNode;
}
const HeadingEffect = ({ children }: headingEffectProps) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HeadingEffect;
