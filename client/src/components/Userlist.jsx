import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User2 } from "lucide-react"

const UserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      const myData = localStorage.getItem("user")
      const id = JSON.parse(myData)._id
      setUsers(data.filter((user) => user._id !== id))
    }

    fetchUser()
  }, [])

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-[30%] bg-white shadow-md border-r border-gray-200">
      <p className="p-4 text-gray-900 font-semibold text-lg">Messages</p>
      <div className="px-4 pb-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-y-auto max-h-[75vh]">
        <AnimatePresence>
          {filteredUsers.map((u) => (
            <motion.div
              key={u._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelectUser(u)}
              className={`p-4 rounded-lg mx-4 my-2 cursor-pointer flex items-center gap-3 transition ${
                selectedUser && selectedUser._id === u._id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <User2 className="w-5 h-5 text-gray-600" />
              <p className="text-gray-800">{u.name}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UserList
