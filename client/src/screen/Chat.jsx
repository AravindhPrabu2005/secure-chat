import { MessageCircle, SendIcon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { encryptMessage, decryptMessage } from "../utils/RSA";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // ✅ Keep socket connection persistent

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const privateKey = localStorage.getItem("keys");

 
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    const myData = localStorage.getItem("user");
    const id = JSON.parse(myData)._id;
    const filteredData = data.filter((user) => user._id !== id);
    setUser(filteredData);
  };

  const sendMessage = () => {
    if (message.trim()) {
  //    const encryptedMessage = encryptMessage(selectedUser.publicKey, message);
      socket.emit("sendMessage", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, sender: "me" },
      ]);
      setMessage("");
    } else {
      alert("Please enter a message");
    }
  };
  useEffect(() => {
    socket.on("receiveMessage", (encryptedMsg) => {
   //   const decryptedMsg = decryptMessage(privateKey, encryptedMsg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: encryptedMsg, sender: "other" },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex font-space ">
      <div className="w-[30%] bg-primary">
        <p className=" p-3 text-white font-bold text-lg">Available Users</p>
        {user &&
          user.map((u) => (
            <div
              onClick={() => {
                setSelectedUser(u);
              }}
              key={u._id}
              className={`p-3 rounded-lg m-2 ${
                u == selectedUser ? "bg-gray-50" : ""
              } hover:bg-gray-200 cursor-pointer`}
            >
              <p className={`${u == selectedUser ? "text-black" : "text-white"}`}>
                {u.email}
              </p>
            </div>
          ))}
      </div>
      <div>
        {selectedUser && (
          <div>
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 m-2 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-gray-200 text-right"
                      : "bg-gray-300 text-left"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="flex p-8 w-[50%] items-center justify-center gap-3 absolute bottom-4">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-2 h-8 px-3 border-primary rounded-md"
                type="text"
              />
              <button
                onClick={() => {
                  sendMessage();
                  console.log("Message sent:", message);
                }}
                className="bg-primary text-white px-3 py-1 rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
