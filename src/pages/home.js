import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainer, WhatsappHome } from "../components/Chat";
import { Sidebar } from "../components/sidebar";
import SocketContext from "../context/SocketContext";
import { getConversations } from "../features/chatSlice";
function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex py-[19px]">
        {/*Sidebar*/}
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
