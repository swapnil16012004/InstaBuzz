import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import AIChatLogo from "../../assets/AIChatLogo.png";
import { MyContext } from "../../App";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContext);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );
      const data = await res.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error fetching response." },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    context.setDisplayLogo(false);
  });

  return (
    <div className="ai-container">
      <div className="chat-history">
        <div className="aiLogoContainer d-flex justify-content-center align-items-center pt-3">
          <div className="logo-effect-wrapper">
            <img className="aichatlogo" src={AIChatLogo} alt="aichatlogo" />
          </div>
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className={`msg-box ${msg.role}`}>
            {msg.role === "user" ? (
              <div className="user-msg">{msg.text}</div>
            ) : (
              <div className="bot-msg">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="msg-box bot">
            <div className="bot-msg">⏳ Thinking...</div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>↑</button>
      </div>
    </div>
  );
}
