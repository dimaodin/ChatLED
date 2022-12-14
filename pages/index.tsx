import Head from 'next/head'
import Login from '../components/Login'
import { useMoralis } from 'react-moralis';
import Header from '../components/Header';
import Messages from '../components/Messages';


export default function Home() {
  const { isAuthenticated, logout } = useMoralis();

  if (!isAuthenticated) return <Login/>

  return (
    <div className="h-screen overflow-y-scroll bg-gradient-to-b from-black to-indigo-900 overflow-hidden select-none">
      <Head>
        <title>ChatLED</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Roboto:wght@500;700;900&display=swap" rel="stylesheet"/>
      </Head>

        <div className='max-w-screen-2xl mx-auto'>
          <Header/>
          <Messages/> 
        </div>
    </div>
  )
}
