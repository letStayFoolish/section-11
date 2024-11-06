import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { ModalRef, ModalRefMethods } from "../types";

const ModalWithRef: React.ForwardRefRenderFunction<
  ModalRefMethods,
  PropsWithChildren
> = ({ children }, ref) => {
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

  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal")!,
  );
};

const Modal = forwardRef(ModalWithRef);

export default Modal;
