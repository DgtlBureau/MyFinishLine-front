import { motion } from "motion/react";

const StoryShadow = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-200 pointer-events-none"
    >
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute top-0 bottom-0 left-0 w-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute top-0 bottom-0 right-0 w-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none border-white/10" />
    </motion.div>
  );
};

export default StoryShadow;
