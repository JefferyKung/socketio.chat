import { BrowserRouter, Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client'

import Chat from './pages/Chat';
import Home from './pages/Home';

const socket = socketIO.connect(import.meta.env.VITE_SERVER_URL)

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
