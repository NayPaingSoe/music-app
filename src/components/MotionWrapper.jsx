import { motion } from "framer-motion";

const defaultInitial = { y: 40, opacity: 0 };
const defaultAnimate = { y: 0, opacity: 1 };
const defaultTransition = { type: "spring", stiffness: 120, damping: 18 };

export function MotionWrapper({
  children,
  className,
  initial = defaultInitial,
  animate = defaultAnimate,
  transition = defaultTransition,
  ...props
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
