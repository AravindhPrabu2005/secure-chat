import React, { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { User2 } from "lucide-react"
import { FaPaperPlane } from "react-icons/fa"

const socket = io("http://localhost:5000")

const ChatWindow = ({ selectedUser }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.on("receiveMessage", (encryptedMsg) => {
      setMessages((prev) => [...prev, { message: encryptedMsg, sender: "other" }])
      scrollToBottom()
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
      scrollToBottom()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  if (!selectedUser) return null

  return (
    <div className="w-full flex flex-col h-[600px] bg-gray-50 shadow-lg rounded-lg">
      <div className="p-4 bg-white shadow-md flex items-center gap-3 border-b border-gray-300">
        <User2 className="w-6 h-6 text-gray-600" />
        <p className="text-gray-900 font-semibold">{selectedUser.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[500px] relative">
        <div className="w-full flex justify-center mb-4">
          <div className="text-xs text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
            Messages are end-to-end encrypted
          </div>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <div className="flex-shrink-0">
                <User2 className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <p
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.message}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-3 p-4 border-t border-gray-300 bg-white">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
        >
          <FaPaperPlane className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
