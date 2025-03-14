import { MessageCircle, MicIcon } from 'lucide-react'
import React from 'react'
import { encryptMessage  , decryptMessage} from '../utils/RSA'
const Chat = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
          <MessageCircle size={100} />
        </div>
  )
}

export default Chat