import { useEffect, useRef, useState } from "react";
import API from "../api";
import "./AIChat.css";

const AIChat = () => {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const bottomRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.post(

        "/ai/chat",

        {
          message: currentMessage
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      const aiMessage = {

        sender: "ai",

        text:
          res.data.reply ||
          "No response"

      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong ❌"
        }
      ]);

    }

    setLoading(false);

  };

  return (

    <div className="chatContainer">

      {/* HEADER */}
      <div className="chatHeader">

        <h2>
          Rep AI Assistant 🚀
        </h2>

      </div>

      {/* CHAT BODY */}
      <div className="chatBody">

        {
          messages.map((msg, index) => (

            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "userMessage"
                  : "aiMessage"
              }
            >

              {msg.text}

            </div>

          ))
        }

        {
          loading && (

            <div className="aiMessage typing">

              <span></span>
              <span></span>
              <span></span>

            </div>

          )
        }

        <div ref={bottomRef}></div>

      </div>

      {/* INPUT */}
      <div className="chatInputArea">

        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );

};

export default AIChat;