import { useSelector } from "react-redux";
import Header from "./Header";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import CallArea from "./CallArea";
import CallActions from "./CallActions";
import { useEffect, useRef } from "react";

export default function Call({
  stream,
  setStream,
  myVideo,
  userVideo,
  callAccepted,
  callEnded,
  disableCamera,
}) {
  const { user, chat } = useSelector((state) => ({ ...state }));
  const { activeConversation } = chat;
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-[350px] h-[550px] z-10 rounded-2xl callbg overflow-hidden">
      {/*Container*/}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-20">
        {/*Header*/}
        <Header />
        {/*CallArea*/}
        <CallArea
          name={
            activeConversation._id
              ? getConversationName(user, activeConversation.users)
              : ""
          }
          picture={
            activeConversation._id
              ? getConversationPicture(user, activeConversation.users)
              : ""
          }
        />
        {/*Call actions */}
        <CallActions disableCamera={disableCamera} />
      </div>
      {/*Video stream*/}
      <video
        playsInline
        muted
        ref={myVideo}
        autoPlay
        className="w-100 h-[100%] bg-blue-500 object-cover absolute top-0 bottom-0 right-0 left-0 z-10"
      />
      {/*Video stream small*/}
      <video
        playsInline
        muted
        ref={userVideo}
        autoPlay
        className="w-28 h-32 object-cover absolute bottom-32 right-2 z-20 "
      />
    </div>
  );
}
