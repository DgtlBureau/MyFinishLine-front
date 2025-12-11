import { motion } from "motion/react";
import { createPortal } from "react-dom";
import CelebrationComponent from "../../Shared/CelebrateComponent/CelebrateComponent";
import { useLottie } from "lottie-react";
import award from "./trophy.json";

const AwardModal = ({
  stepName,
  onCloseClick,
}: {
  stepName: string;
  onCloseClick: () => void;
}) => {
  const options = {
    animationData: award,
    loop: false,
  };

  const { View } = useLottie(options);

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-screen h-screen fixed top-0 left-0 bg-black/50 z-100 flex items-center flex-col justify-center px-2"
      >
        <CelebrationComponent />
        <div className="relative">
          {View}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative flex flex-col items-center"
          >
            <motion.span
              className="text-white text-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3, ease: "easeInOut" }}
            >
              Congratulations! You finished the {stepName} step!
            </motion.span>
          </motion.div>
          <motion.button
            className="block bg-black px-8 py-2 rounded-lg text-white mt-2 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4, ease: "easeInOut" }}
            onClick={onCloseClick}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </>,
    document.body
  );
};

export default AwardModal;
