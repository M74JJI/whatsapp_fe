import { useEffect, useState } from "react";
import { CloseIcon, ValidIcon } from "../../../svg";

export default function Ringing({
  answerCall,
  name,
  picture,
  setReceivingCall,
  setCallEnded,
}) {
  const [timer, setTimer] = useState(0);
  const handleTimer = () => {
    setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };
  useEffect(() => {
    if (timer < 3000) {
      handleTimer();
    } else {
      setCallEnded(true);
      setReceivingCall(false);
    }
  }, [timer]);
  return (
    <div className="bg-dark_bg_1 rounded-lg fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg z-30">
      {/*Container*/}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/*call infos*/}
        <div className="flex items-center gap-x-2">
          <img src={picture} alt="" className="w-28 h-28 rounded-full" />
          <div>
            <h1 className="text-white">
              <b>{name}</b>
            </h1>
            <span className="text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>

        {/*call actions*/}
        <ul className="flex items-center gap-x-2">
          <li onClick={() => setCallEnded(true)}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li onClick={() => answerCall()}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/*ringtone*/}
      <audio src="../../../../audio/ringtone.mp3" autoPlay loop></audio>
    </div>
  );
}
