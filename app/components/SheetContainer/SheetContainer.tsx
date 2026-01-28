import { ReactNode } from "react";
import { Sheet } from "react-modal-sheet";

interface ISheetContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SheetContainer = ({
  isOpen,
  onClose,
  children,
}: ISheetContainerProps) => {
  return (
    <Sheet detent="content" isOpen={isOpen} onClose={onClose}>
      <Sheet.Container
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Sheet.Header />
        <Sheet.Content disableDrag>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};

export default SheetContainer;
