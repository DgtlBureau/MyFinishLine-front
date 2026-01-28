import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface IPortalModalProps {
  fullscreen?: boolean;
  children: React.ReactNode;
  contentClassName?: string;
  onClose?: () => void;
}

interface ICustomModalProps extends IPortalModalProps {
  isOpen: boolean;
}

const PortalModal = ({
  fullscreen,
  children,
  contentClassName,
  onClose,
}: IPortalModalProps) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 h-screen w-screen z-50 p-4 flex items-center justify-center"
    >
      <div className="absolute top-0 left-0 bg-black/40 backdrop-blur-md h-full w-full"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "relative bg-white/60 backdrop-blur-2xl backdrop-saturate-150 p-4 box-border rounded-2xl z-10 max-w-3xl w-full border border-white/50 shadow-xl",
          fullscreen ? "w-full h-full" : "",
          contentClassName,
        )}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 block cursor-pointer p-1.5 rounded-full bg-white/40 hover:bg-white/60 transition-colors text-[#09090B]/70 hover:text-[#09090B]"
        >
          <X size={18} />
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

const CustomModal = ({
  children,
  isOpen,
  fullscreen,
  contentClassName,
  onClose,
}: ICustomModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <PortalModal
          contentClassName={contentClassName}
          fullscreen={fullscreen}
          onClose={onClose}
        >
          {children}
        </PortalModal>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
