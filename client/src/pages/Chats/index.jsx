import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    context.setShowNavbar(true);
  }, [context.showNavbar]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
  }, [context.currUser]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Chat with User</h2>
          <div className="mt-4">
            <div className="mb-2">
              <strong>User1:</strong> Hello!
            </div>
            <div className="mb-2">
              <strong>User2:</strong> Hi there!
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
