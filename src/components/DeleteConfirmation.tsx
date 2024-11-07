import React, { useEffect } from "react";
import Progress from "./Progress.tsx";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const TIMER = 3000;

const DeleteConfirmation: React.FC<Props> = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log("Timeout set");
      onConfirm();
    }, TIMER);

    // cleanup function:
    return () => {
      console.log("CLearn timeout set");
      clearTimeout(timerId);
    };
  }, [onConfirm]); // functions in dependency array are tricky, because they can trigger infinite loop!

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <Progress timer={TIMER} />
    </div>
  );
};

export default DeleteConfirmation;
