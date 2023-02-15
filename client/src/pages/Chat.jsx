import React, { useEffect, useState, useRef} from 'react'
import ChatBar from '../components/ChatBar'
import ChatBody from '../components/ChatBody'
import ChatFooter from '../components/ChatFooter'

const ChatPage = ({socket}) => {
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  //for messageResponse
  useEffect(() => {
    socket.on("messageResponse", data => setMessages(prevState => [...prevState, data]))
  },[socket, messages])

  //for typingResponse
  useEffect(() => {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])


  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  )
}

export default ChatPage