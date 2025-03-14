import { AudioLines, House, MessageCircle, Search, Users  ,LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
    const nav = useNavigate()
  return (
    <nav className=" w-[20%] font-inter">
      <p className=" p-5 text-xl font-bold font-space">Secure Chat</p>
      <div className="flex flex-col gap-2 h-screen px-4 bg-white">
         <Link to={"/dashboard/chat"}>
         <div  className="flex items-center font-semibold gap-2 cursor-pointer hover:bg-gray-100 py-2 px-2">
              <MessageCircle size={25} className=""/>
              <p>Chat</p>
         </div>
         </Link>
         <Link to={"/dashboard/voice"}>
         <div  className="flex items-center font-semibold gap-2 cursor-pointer hover:bg-gray-100 py-2 px-2">
              <AudioLines size={25} className=""/>
              <p>Voice</p>
         </div>
    </Link>
    <Link to={"/dashboard/groups"}>
         <div  className="flex items-center font-semibold gap-2 cursor-pointer hover:bg-gray-100 py-2 px-2">
              <Users size={25} className=""/>
              <p>Groups</p>
         </div>
         </Link>
         <Link to={"/dashboard/search"}>
         <div  className="flex items-center font-semibold gap-2 cursor-pointer hover:bg-gray-100 py-2 px-2">
              <Search size={25} className=""/>
              <p>Find</p>
         </div>
         </Link>
         
       
      </div>

      <div onClick={()=>{
        localStorage.clear()
        window.location.reload()
        
      }} className="absolute bottom-0 ">
        <div  className="flex items-center font-semibold gap-2 cursor-pointer  py-2 px-2">
              <LogOut size={25} className=""/>
              <p>Log Out</p>
         </div>
      </div>
    </nav>
  );
};

export default SideBar;
