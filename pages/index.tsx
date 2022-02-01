import { useWeb3 } from '@3rdweb/hooks'
import { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { client } from '../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export default function Home() {
  const { address, connectWallet } = useWeb3()
  // used to connect to wallet via web3

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#1b3f61',
          color: '#fff',
        },
      }
    )
  }
  // a message to the user after successfull loadGetInitialProps, using toast

  useEffect(() => {
    if (!address)
      return // if no address just return, otherwise run IIFE of creating new user
    ;(async () => {
      // IIFE immediately invoked functional expression
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
        // user information layout, every user is unique due to wallet address and is remembered
      }

      const result = await client.createIfNotExists(userDoc)
      // create user if doesnt exist
      welcomeUser(result.userName)
      // calling the function to welcome user
    })()
  }, [address])

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        // if wallet is connected, show the site
        <>
          <Header />
          <Hero />
        </>
      ) : (
        // if wallet is not connected, let user connect
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet('injected')}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome to be <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}
