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
      className="fixed top-0 left-0 h-screen w-screen z-50 p-2 flex items-center justify-center backdrop-blur-xl"
    >
      <div className="absolute top-0 left-0 bg-black/50 h-full w-full"></div>
      <div
        className={cn(
          "relative bg-background p-2 box-border rounded z-10 max-w-3xl w-full",
          fullscreen ? "w-full h-full" : "",
          contentClassName,
        )}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute right-0 top-0 block cursor-pointer p-2 ml-auto mr-0"
        >
          <X />
        </button>
      </div>
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
