const Chat = ({ selectedUser }) => {
     if (!selectedUser) {
       return (
         <div className="w-3/4 h-screen flex items-center justify-center text-gray-500 text-xl">
           Select a user to chat
         </div>
       )
     }
   
     return (
       <div className="w-3/4 h-screen p-4">
         <h2 className="text-xl font-semibold mb-4">Chat with {selectedUser.email}</h2>
         <div className="bg-gray-100 h-[80%] p-4 rounded mb-4 overflow-y-auto">
           {/* messages will go here */}
         </div>
         <div className="flex gap-2">
           <input
             type="text"
             placeholder="Type a message"
             className="w-full border p-2 rounded"
           />
           <button className="bg-blue-500 text-white px-4 py-2 rounded">
             Send
           </button>
         </div>
       </div>
     )
   }
   
   export default Chat
   