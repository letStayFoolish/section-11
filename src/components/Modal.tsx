import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { ModalRef, ModalRefMethods } from "../types";

type Props = PropsWithChildren & { isOpen: boolean };

const ModalWithRef: React.ForwardRefRenderFunction<ModalRefMethods, Props> = (
  { children, isOpen },
  ref,
) => {
  const dialogRef = useRef<ModalRef>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogRef?.current?.showModal();
      },
      close: () => {
        dialogRef?.current?.close();
      },
    };
  });

  console.log({ isOpen });

  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      {isOpen ? children : null}
    </dialog>,
    document.getElementById("modal")!,
  );
};

const Modal = forwardRef(ModalWithRef);

export default Modal;
