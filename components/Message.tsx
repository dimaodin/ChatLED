import React from 'react'
import { useMoralis } from 'react-moralis'
import Avatar from './Avatar'
import TimeAgo from 'timeago-react'

type AppProps = {
  message: any
}
function Message({ message }: AppProps) {
  const { user } = useMoralis()
  const isUserMessage = message.get('ethAddress') === user?.get('ethAddress')

  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const truncateEthAddress = (address: string) => {
    const match = address.match(truncateRegex)
    if (!match) return address
    return `${match[1]}…${match[2]}`
  }

  return (
    <div
      className={`relative flex items-end space-x-2 
            ${isUserMessage && 'justify-end'}
        `}
    >
      <div className={`relative h-8 w-8 ${isUserMessage && 'order-last ml-2'}`}>
        <Avatar username={message.get('ethAddress')} logoutOnPress="false" />
      </div>
      <div
        className={`flex space-x-4 rounded-lg p-3 px-3 hover:opacity-80
                ${
                  isUserMessage
                    ? 'rounded-br-none bg-indigo-100'
                    : 'rounded-bl-none bg-indigo-400'
                }
                `}
      >
        <p>{message.get('message')}</p>
      </div>

      <TimeAgo
        className={`text-[10px] italic text-gray-300
                ${isUserMessage && 'order-first pr-1'}
                `}
        datetime={message.createdAt}
      />

      <p
        className={`absolute -bottom-5 text-xs ${
          isUserMessage ? 'text-indigo-200' : 'text-blue-500'
        }`}
      >
        {truncateEthAddress(message.get('ethAddress'))}
      </p>
    </div>
  )
}

export default Message
