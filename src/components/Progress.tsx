import React, { useEffect, useState } from "react";

type Props = {
  timer: number;
};

const Progress: React.FC<Props> = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    // `setInterval` is used when we need to re-execute function on a short time period.
    // `setTimeout` sets a timer which expires after a given time period.
    const intervalId = setInterval(() => {
      setRemainingTime((previousValue) => previousValue - 10);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <progress value={remainingTime} max={timer} />
    </>
  );
};

export default Progress;
