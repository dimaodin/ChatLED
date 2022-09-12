import Image from 'next/image'
import React from 'react'
import { useMoralis } from 'react-moralis'
import metamask from '../public/metamask.svg'
import avatar from '../public/avatar.png'
import walletconnect from '../public/walletconnect.svg'
import BgEffect from './BgEffect'

function Login() {
  const { authenticate } = useMoralis()

  const doMetaMaskLogin = () => {
    authenticate({
      provider: 'metamask',
      onSuccess: () => alert('You Successfully logged in 🎉'),
      signingMessage:
        'Moralis Authentication, press sign to login and start chatting!',
    }).then(
      (message: any) => {
        if (!message)
          alert(
            'It looks like something gone wrong. Try again later or check your MetaMask configuration.'
          )
      },
      (error: any) => {
        throw Error(error)
      }
    )
  }

  const doWalletConnectLogin = () => {
    authenticate({
      provider: 'walletconnect',
      onSuccess: () => alert('You Successfully logged in 🎉'),
      signingMessage:
        'Moralis Authentication, press sign to login and start chatting!',
    }).then(
      (message: any) => {
        if (!message)
          alert(
            'It looks like something gone wrong. Try again later or check your WalletConnect configuration.'
          )
      },
      (error: any) => {
        throw Error(error)
      }
    )
  }

  return (
    <div className="relative h-screen w-full select-none overflow-hidden bg-zinc-900 text-white">
      <BgEffect />
      <div className="absolute flex w-full flex-col items-center justify-center space-y-4">
        <div className="mb-20 flex flex-col items-center justify-center md:flex-row">
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="w-[250px] text-5xl tracking-[-3px] text-indigo-50 md:w-[550px] md:text-8xl">
              We are <span className="text-indigo-200">Chat</span>
              <span className="font-bold text-indigo-600">LED</span>. 💬
            </div>
            <p className="mt-4 w-[250px] text-lg tracking-[-1px] text-indigo-50 md:w-[550px] md:px-4 md:text-2xl">
              A Decentralized Realtime Chat Application, using your wallet
              address to connect ✨
            </p>
          </div>
          <div className="w-1/2 md:w-full">
            <Image
              height={350}
              width={350}
              className="object-cover"
              placeholder="blur"
              src={avatar}
            />
          </div>
        </div>
        <button
          className="flex animate-pulse flex-row items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-indigo-700 to-indigo-900 px-5 py-3 text-white"
          onClick={() => doMetaMaskLogin()}
        >
          <Image src={metamask} alt="walletconnect" height={25} width={25} />
          <span className="pl-2">MetaMask</span>
        </button>
        <button
          className="flex animate-pulse flex-row items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-indigo-700 to-indigo-900 px-5 py-3 text-white	"
          onClick={() => doWalletConnectLogin()}
        >
          <Image
            src={walletconnect}
            alt="walletconnect"
            height={25}
            width={25}
          />
          <span className="pl-2">WalletConnect</span>{' '}
        </button>
      </div>
    </div>
  )
}

export default Login
