import Ringing from "./Ringing";
import { useState } from "react";
import Header from "./Header";
import CallArea from "./CallArea";
import CallActions from "./CallActions";
export default function VideoCall({
  stream,
  answerCall,
  myVideo,
  userVideo,
  callAccepted,
  callEnded,
  name,
  picture,
  leaveCall,
  receivingCall,
  total,
  setTotal,
  show,
  disableCamera,
}) {
  const [toggle, setToggle] = useState(false);
  const [showActions, setShowActions] = useState(false);

  //------------------------------------------------------------
  return (
    <>
      <div
        className={`fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-[350px] h-[550px] z-10 rounded-2xl callbg overflow-hidden
        ${receivingCall && !callAccepted ? "hidden" : "block"}`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/*Container*/}
        <div className="">
          <div>
            {/*Header*/}
            <Header />
            {/*CallArea*/}
            <CallArea
              name={name}
              total={total}
              setTotal={setTotal}
              callAccepted={callAccepted}
            />
            {/*Call actions */}
            <div className={showActions ? "moveActionsComp" : "hidden"}>
              <CallActions
                disableCamera={disableCamera}
                leaveCall={leaveCall}
              />
            </div>
          </div>
          <div className="video-container">
            <div className="video">
              {callAccepted && !callEnded && (
                <video
                  playsInline
                  muted
                  ref={userVideo}
                  autoPlay
                  className={
                    callAccepted && !callEnded && !toggle
                      ? "largeVideoCall"
                      : "SmallVideoCall"
                  }
                  onClick={() => setToggle((prev) => !prev)}
                />
              )}
            </div>
            <div className="video">
              {stream ? (
                <video
                  playsInline
                  ref={myVideo}
                  autoPlay
                  className={`rounded-lg ${
                    callAccepted && !callEnded && !toggle
                      ? "SmallVideoCall"
                      : "largeVideoCall"
                  } ${showActions ? "moveVideoCall" : ""}`}
                  onClick={() => setToggle((prev) => !prev)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-500">
        {receivingCall && !callAccepted ? (
          <Ringing answerCall={answerCall} picture={picture} name={name} />
        ) : null}
      </div>
      {!callAccepted && show && (
        <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio>
      )}
    </>
  );
}
