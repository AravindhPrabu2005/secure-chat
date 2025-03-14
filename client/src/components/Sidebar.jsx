import { useState, useEffect } from 'react'

const Sidebar = ({ onUserClick }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="w-1/4 h-screen bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="bg-white p-2 rounded cursor-pointer hover:bg-gray-300"
            onClick={() => onUserClick(user)}
          >
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
