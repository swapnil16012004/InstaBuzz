import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "../../components/ChatSidebar";
import ChatBox from "../../components/ChatBox";

const Chats = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [refreshSidebarKey, setRefreshSidebarKey] = useState(0);

  useEffect(() => {
    context.setShowNavbar(true);
  }, [context.showNavbar]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
  }, [context.currUser]);

  const triggerSidebarRefresh = () => {
    setRefreshSidebarKey((prev) => prev + 1);
  };

  useEffect(() => {
    context.setDisplayLogo(true);
    return () => {
      context.setDisplayLogo(false);
    };
  });

  return (
    <div className="chat-app">
      <ChatSidebar
        setSelectedPerson={setSelectedPerson}
        refreshTrigger={refreshSidebarKey}
      />
      <ChatBox
        selectedPerson={selectedPerson}
        triggerRefresh={triggerSidebarRefresh}
      />
    </div>
  );
};

export default Chats;
