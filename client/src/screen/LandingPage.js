import React from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
    <nav >
        <div className="flex items-center justify-between font-inter max-w-6xl mx-auto p-4">
          <div className="text-2xl font-bold">SecureChat</div>
          <div className="flex gap-5">
            <Link to="/login" className="text-lg ">Login</Link>
            <Link to="/signup" className="text-lg ">Signup</Link>
          </div>
        </div>
    </nav>
      <div className="min-h-screen flex items-center font-inter justify-center bg-gray-100">
        <div className=" flex flex-col items-center justify-center gap-5">
            <p className=" max-md:text-2xl text-5xl font-space font-bold ">Locked Tight. Only You Hold the Key</p>
             

              <Link to="/chat" className="text-lg"> <button className=" bg-primary px-2 py-1 rounded-full text-white ">Make Secure Chat</button></Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
