import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ socket }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName)
    socket.emit("newUser", { userName, socketID: socket.id })
    navigate("/chat")
  }

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign In to Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        className="username__input"
        type="text"
        name="username"
        id="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit" className="home__cta">SIGN IN</button>
    </form>
  );
}

export default Home;
