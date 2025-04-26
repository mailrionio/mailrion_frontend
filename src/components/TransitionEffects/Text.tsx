const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};
const item = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.5 } },
};

import { motion } from "framer-motion";
import React from "react";

interface TextEffectProps {
  duration?: number;
  children: React.ReactNode;
}

const TextEffect: React.FC<TextEffectProps> = ({
  duration = 0.5,
  children,
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration }}
    >
      {children}
    </motion.p>
  );
};

export default TextEffect;
