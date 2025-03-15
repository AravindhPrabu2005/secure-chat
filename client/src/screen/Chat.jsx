import React, { useState } from "react"
import UserList from "../components/Userlist"
import ChatWindow from "../components/Chatwindow"

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="bg-gray-50 min-h-screen flex font-space">
      <UserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  )
}

export default Chat
