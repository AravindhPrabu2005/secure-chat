import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { SendIcon } from "lucide-react"

const socket = io("http://localhost:5000")

const ChatWindow = ({ selectedUser }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("receiveMessage", (encryptedMsg) => {
      setMessages((prev) => [...prev, { message: encryptedMsg, sender: "other" }])
    })

    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message)
      setMessages((prev) => [...prev, { message, sender: "me" }])
      setMessage("")
    }
  }

  if (!selectedUser) return null

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 bg-white shadow-md flex justify-between items-center border-b border-gray-200">
        <p className="text-gray-900 font-medium">{selectedUser.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-4 border-t border-gray-200 bg-white">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
