import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WhatsappHome } from "../components/Chat";
import { Sidebar } from "../components/sidebar";
import { getConversations } from "../features/chatSlice";
export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  console.log("activeConversation", activeConversation);
  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex py-[19px]">
        {/*Sidebar*/}
        <Sidebar />
        {activeConversation._id ? "home" : <WhatsappHome />}
      </div>
    </div>
  );
}
