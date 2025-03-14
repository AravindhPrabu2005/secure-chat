import React from 'react'
import SideBar from './SideBar'
import Chat from '../screen/Chat'
import Groups from '../screen/Groups'
import Voice from '../screen/Voice'
import Search from '../screen/Search'

const Mainpage = () => {
  const [current, setCurrent] = React.useState('Chat')

  const items = [
    {
      
    }
  ]
  return (
    <div className=' flex'>
      <SideBar/>
      <div className="w-[80%] bg-gray-200">
          
          {current === 'Chat' && <Chat/>}
          {current === 'Groups' && <Groups/>}
          {current === 'Voice' && <Voice/>}
          {current === 'Search' && <Search/>}
        </div>
    </div>
  )
}

export default Mainpage