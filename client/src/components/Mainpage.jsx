import { useState } from 'react'
import Sidebar from './Sidebar'
import Chat from './chat'


const MainPage = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  return (
    <div className="flex">
      <Sidebar onUserClick={handleUserClick} />
      <Chat selectedUser={selectedUser} />
    </div>
  )
}

export default MainPage
