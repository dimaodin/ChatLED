import React, { useRef } from 'react'
import { ByMoralis, useMoralis, useMoralisQuery } from 'react-moralis'
import Message from './Message'
import SendMessage from './SendMessage'

function Messages() {
  const { user } = useMoralis()
  const endOfMessagesRef = useRef(null)
  const { data, isLoading, error } = useMoralisQuery(
    'Messages',
    (query) => query.ascending('createdAt'),
    [],
    {
      live: true,
    }
  )

  return (
    <div className="mx-auto max-w-5xl pb-56 ">
      {isLoading ? (
        <div className="text-1xl mx-auto mt-2 text-center text-indigo-600">
          Loading messages...
        </div>
      ) : (
        <div className="space-y-10 p-4">
          {data.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <SendMessage endOfMessagesRef={endOfMessagesRef} />
      </div>
      <div ref={endOfMessagesRef}></div>
    </div>
  )
}

export default Messages
