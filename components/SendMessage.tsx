import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

type AppProps = {
  endOfMessagesRef: any
}

function SendMessage({ endOfMessagesRef }: AppProps) {
  const { user, Moralis } = useMoralis()
  const [message, setMessage] = useState('')

  const sendMessage = (e: any) => {
    e.preventDefault()
    if (!message) return
    const Messages = Moralis.Object.extend('Messages')
    const messages = new Messages()

    messages
      .save({
        message: message,
        username: user?.getUsername(),
        ethAddress: user?.get('ethAddress'),
      })
      .then(
        (message: any) => {
          endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
          setMessage('')
        },
        (error: any) => {
          alert('Error sending message. Please try again.')
        }
      )
  }
  return (
    <form
      className="fixed bottom-10 z-20 flex w-11/12 max-w-2xl
        rounded-full border-2 border-indigo-500 bg-indigo-900	px-6 py-4 opacity-80 shadow-xl 
        backdrop-blur-xl"
    >
      <input
        className="flex-grow bg-transparent pr-5 
                text-white placeholder-gray-500
                outline-none"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message..."
      />
      <button
        type="submit"
        onClick={sendMessage}
        className="font-bold text-indigo-100"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  )
}

export default SendMessage
