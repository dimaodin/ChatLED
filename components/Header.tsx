import React from 'react'
import { useMoralis } from 'react-moralis'
import Image from 'next/image'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import BgEffect from './BgEffect'

export default function Header() {
  const { user, logout } = useMoralis()
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const truncateEthAddress = (address: string) => {
    const match = address.match(truncateRegex)
    if (!match) return address
    return `${match[1]}…${match[2]}`
  }

  return (
    <div
      className="sticky top-0 z-50 resize-y overflow-hidden border-b-2
        border-indigo-900 bg-zinc-900 p-5 shadow-sm"
    >
      <BgEffect />
      <div className="">
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="cursor-pointer select-auto rounded-lg bg-indigo-700 p-2 tracking-[-1px] text-indigo-100 shadow-md hover:opacity-80"
          >
            Sign Out{' '}
            <FontAwesomeIcon className="ml-1" icon={faRightToBracket} />
          </button>
        </div>
        <div className="relative mx-auto h-28 w-28 rounded-full border-4 border-indigo-900">
          <Avatar username={user?.get('ethAddress')} logoutOnPress="false" />
        </div>

        <h1 className="mx-auto mt-4 text-center text-3xl tracking-[-1px] text-indigo-400">
          Welcome to <span className="text-indigo-200">Chat</span>
          <span className="font-bold text-indigo-600">LED</span>. 💬
        </h1>

        <h2 className="text-1xl mx-auto mt-2 text-center text-indigo-100">
          <span className="underline">Your wallet address is:</span>{' '}
          <span className="text-ellipsis">
            {truncateEthAddress(user?.get('ethAddress'))}
          </span>
        </h2>
      </div>
    </div>
  )
}
