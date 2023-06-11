import { useEffect } from "react";

export default function CallTimes({ total, setTotal, callAccepted }) {
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    if (callAccepted) {
      setTime();
    }
    return () => setTotal(0);
  }, [callAccepted]);
  return (
    <div className={`text-dark_text_2 ${total !== 0 ? "block" : "hidden"}`}>
      {parseInt(total / 3600) <= 0 && (
        <>
          <span>
            {parseInt(total / 3600).toString().length < 2
              ? "0" + parseInt(total / 3600)
              : parseInt(total / 3600)}
          </span>
          <span>:</span>
        </>
      )}
      <span>
        {parseInt(total / 60).toString().length < 2
          ? "0" + parseInt(total / 60)
          : parseInt(total / 60)}
      </span>
      <span>:</span>
      <span>
        {(total % 60).toString().length < 2 ? "0" + (total % 60) : total % 60}
      </span>
    </div>
  );
}
