"use client";

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: number;
}

export const Modal = ({ children, onClose, maxWidth = 500 }: IModal) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-fit p-4" style={{ maxWidth: `${maxWidth}px` }}>
        {children}
      </div>
    </div>
  );
};
