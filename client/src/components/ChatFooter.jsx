import React, { useState, useEffect } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false)

  const userName = localStorage.getItem("userName")

  useEffect(() => {

    let delayDebounceFn

    if(isSubmitted){
      delayDebounceFn = setTimeout(() => {
        socket.emit("typing", "")
      }, 2000)
    }

    return () => clearTimeout(delayDebounceFn)
  }, [message])

  const handleTyping = () => {
    socket.emit("typing", `${userName} is typing...`)
    setIsSubmitted(false)
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if(message.trim() && userName){
      socket.emit("message", {
        text: message,
        name: userName,
        id: `${socket.id}-${Math.random()}`, //probably should use uuid
        socketID: socket.id
      })
    }

    setMessage("");
    setIsSubmitted(true);
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
