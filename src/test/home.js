import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";
import { ChatContainer, WhatsappHome } from "../components/Chat";
import { Sidebar } from "../components/sidebar";
import SocketContext from "../context/SocketContext";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";
//------------
import VideoCall from "../components/Chat/call/VideoCall";
//------------
const callData = {
  socketId: "",
  name: "",
  picture: "",
  signal: "",
  receivingCall: false,
  callEnded: false,
};

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccppted] = useState();
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  //--call ref
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //typing
  const [typing, setTyping] = useState(false);
  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //call
  useEffect(() => {
    setup();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });
    socket.on("leaveCall", () => {
      setShow(false);
      setCall({ ...call, callEnded: true });
      myVideo.current.srcObject = null;
      //connectionRef.current.destroy();
    });
  }, []);
  const setup = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };
  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };
  const callUser = (id) => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signalData: data,
        from: call.socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccppted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
  const answerCall = () => {
    enableMedia();
    setCallAccppted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCall({ ...call, callEnded: true });
    myVideo.current.srcObject = null;
    socket.emit("leaveCall", call.socketId);
    connectionRef.current.destroy();
  };

  //--------------------------

  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  useEffect(() => {
    //lsitening to receiving a message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);
  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex py-[19px]">
          {/*Sidebar*/}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/*Call*/}
      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <VideoCall
          stream={stream}
          myVideo={myVideo}
          callAccepted={callAccepted}
          callEnded={call.callEnded}
          userVideo={userVideo}
          name={call.name}
          picture={call.picture}
          callUser={callUser}
          answerCall={answerCall}
          leaveCall={leaveCall}
          total={total}
          receivingCall={call.receivingCall}
          setTotal={setTotal}
          show={show}
        />
      </div>
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
