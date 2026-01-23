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
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};

export default SheetContainer;
