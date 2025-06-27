import React, { useContext, useEffect, useState } from "react";
import socket from "../../socket";
import axiosInstance from "../../axiosConfig";
import { MyContext } from "../../App";
import { getShortInstabuzTime } from "../../utils/TimeUtils";

const ChatBox = ({ selectedPerson, triggerRefresh }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const { currUser } = useContext(MyContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axiosInstance.get(`/get-id-by-username/${currUser}`);
        setUserId(res.data._id);
      } catch (err) {
        console.error("Failed to fetch user ID", err);
      }
    };

    if (currUser) fetchUserId();
  }, [currUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedPerson || !userId) return;
      try {
        const res = await axiosInstance.get(
          `/messages?user1=${userId}&user2=${selectedPerson._id}`
        );

        await axiosInstance.post("/mark-as-read", {
          senderId: selectedPerson._id,
          receiverId: userId,
        });
        triggerRefresh?.();

        const history = res.data.messages.map((m) => ({
          text: m.text,
          createdAt: m.createdAt,
          fromSelf: m.sender._id === userId,
        }));
        setMessages(history);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, [selectedPerson, userId]);

  useEffect(() => {
    socket.on("receive-message", (incomingMsg) => {
      setMessages((prev) => [
        ...prev,
        {
          text: incomingMsg,
          fromSelf: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const handleSend = async () => {
    if (!msg.trim() || !userId) return;

    const newMsg = {
      text: msg,
      fromSelf: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    await axiosInstance.post("/messages", {
      sender: userId,
      receiver: selectedPerson._id,
      text: msg,
    });

    socket.emit("send-message", {
      to: selectedPerson._id,
      message: msg,
    });

    setMsg("");
    triggerRefresh?.();
  };

  if (!selectedPerson)
    return <div className="chat-box empty">Select a conversation</div>;

  return (
    <div className="chat-box">
      <div className="chat-header">{selectedPerson.username}</div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-message ${m.fromSelf ? "own" : "other"}`}
          >
            <div className="chat-text">{m.text}</div>
            <div className="chat-timestamp">
              {m.createdAt ? getShortInstabuzTime(new Date(m.createdAt)) : ""}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
