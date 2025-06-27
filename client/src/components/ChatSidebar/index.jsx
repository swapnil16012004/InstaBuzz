import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../axiosConfig";
import defaultProfileImg from "../../assets/profile1.jpg";
import { MyContext } from "../../App";
import socket from "../../socket";
import { Link } from "react-router-dom";

const ChatSidebar = ({ setSelectedPerson, refreshTrigger }) => {
  const [userList, setUserList] = useState([]);
  const { currUser } = useContext(MyContext);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(`/users?currUsername=${currUser}`);
      const sorted = res.data.users
        .map((u) => ({
          ...u,
          lastMsgTime: u.lastMsgTime ? new Date(u.lastMsgTime) : null,
        }))
        .sort((a, b) => {
          return (
            (b.lastMsgTime?.getTime() || 0) - (a.lastMsgTime?.getTime() || 0)
          );
        });

      setUserList(sorted);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    if (currUser) fetchUsers();
  }, [currUser, refreshTrigger]);

  useEffect(() => {
    socket.on("receive-message", () => {
      fetchUsers();
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  return (
    <div className="chat-sidebar">
      <h2>Messages</h2>
      {userList.map((user) => (
        <div
          key={user._id}
          className="chat-user"
          onClick={() => setSelectedPerson(user)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={user.profileImg || defaultProfileImg}
                alt="dp"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              />
              <div>
                <div className="chat-user-name">
                  <Link to={`/profile/${user.username}`}>{user.username}</Link>
                </div>
                <div className="chat-user-msg">
                  {user.lastMsg || "No messages yet"}
                </div>
              </div>
            </div>

            {user.unreadCount > 0 && (
              <div className="unread-badge">
                {user.unreadCount > 9 ? "9+" : user.unreadCount}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
