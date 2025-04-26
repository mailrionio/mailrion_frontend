// import { AnimatePresence, motion } from "framer-motion";
// import React from "react";
// import { useLocation } from "react-router-dom";
// // const variants = {
// //   in: {
// //     opacity: 1,
// //     scale: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.35,
// //       delay: 0.05,
// //     },
// //   },
// //   out: {
// //     opacity: 0,
// //     scale: 1,
// //     y: 40,
// //     transition: {
// //       duration: 0.35,
// //     },
// //   },
// // };
// export const pageTransition = {
//   type: "tween",
//   ease: "anticipate",
//   duration: 1.2,
// };

// // export const pageVariants = {
// //   initial: { opacity: 0, x: "-100vw", scale: 0.8 },
// //   in: { opacity: 1, x: 0, scale: 1 },
// //   out: { opacity: 0, x: "100vw", scale: 1.2 },
// // };

// const containerVariants = {
//   present: {
//     x: 0,
//   },
//   next: {
//     x: "100%", // Slide the next page in from the right
//   },
// };

// const pageVariants = {
//   present: {
//     x: 0,
//     opacity: 1,
//   },
//   next: {
//     x: "-100%", // Slide the present page off to the left
//     opacity: 0,
//   },
// };

// interface PageEffectProps {
//   children: React.ReactNode;
// }
// const PageEffect = ({ children }: PageEffectProps) => {
//   const location = useLocation();
//   const { pathname } = location;

//   return (
//     <div className="effect-1">
//       <AnimatePresence initial={false} mode="wait">
//         <motion.div
//           key={pathname}
//           variants={containerVariants}
//           transition={pageTransition}
//           animate="in"
//           initial="out"
//           exit="out"
//         >
//           {children}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default PageEffect;

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";

const containerVariants = {
  present: {
    x: 0,
  },
  next: {
    x: "-100%", // Slide the next page in from the right
  },
};

const pageVariants = {
  present: {
    x: 0,
    opacity: 1,
  },
  next: {
    x: "100%", // Slide the present page off to the left
    opacity: 0,
  },
};

interface PageEffectProps {
  children: React.ReactNode;
}

const PageEffect: React.FC<PageEffectProps> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="effect-1">
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          variants={containerVariants}
          transition={{ type: "tween", ease: "anticipate", duration: 1.2 }}
          animate="present"
          initial="next" // Set initial to "next" for the page to slide in from the right initially
          exit="next" // Set exit to "next" for the page to slide out to the left when exiting
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageEffect;
