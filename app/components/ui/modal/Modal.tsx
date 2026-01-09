"use client";

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: IModal) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-fit max-w-[500px] p-4">{children}</div>
    </div>
  );
};
