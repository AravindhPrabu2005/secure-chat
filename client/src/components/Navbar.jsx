import { AudioLines, MessageCircle, Users, LogOut } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <nav className="w-[80px] h-screen bg-white flex flex-col justify-between items-center py-4 border-r">
      <div className="flex flex-col items-center gap-5 mt-[-10px]">
        <img 
          src="https://th.bing.com/th/id/OIP.nK7SJzjh9d-Wn1h1DsOcQAHaFj?rs=1&pid=ImgDetMain" 
          alt="logo" 
          className="w-16 h-16 rounded-full" 
        />
        <Link to="/dashboard/chat" className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-black">
          <MessageCircle size={24} />
          <span>Message</span>
        </Link>
        <Link to="/dashboard/groups" className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-black">
          <Users size={24} />
          <span>Groups</span>
        </Link>
        <Link to="/dashboard/voice" className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-black">
          <AudioLines size={24} />
          <span>Voice</span>
        </Link>
      </div>
      <div 
        onClick={() => { localStorage.clear(); window.location.reload(); }} 
        className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-red-500 cursor-pointer"
      >
        <LogOut size={24} />
        <span>Logout</span>
      </div>
    </nav>
  )
}

export default SideBar
