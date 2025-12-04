import { Trophy, X } from "lucide-react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

const AwardModal = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-screen h-screen fixed top-0 left-0 bg-black/50 z-100 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative flex flex-col items-center"
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="absolute top-0 right-0"
          onClick={onCloseClick}
        >
          <X color="white" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, rotateX: "0" }}
          animate={{ opacity: 1, rotateY: "720deg" }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
        >
          <Trophy color="gold" size={240} />
        </motion.div>
        <motion.span
          className="text-white text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3, ease: "easeInOut" }}
        >
          Congratulations! You finished the step!
        </motion.span>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default AwardModal;
