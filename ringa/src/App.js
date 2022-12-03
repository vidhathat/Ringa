import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

function App() {

  const [game, setGame] = useState(null)

  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='flex items-center justify-between px-4 py-2'>
        <div>
          <h1 className='text-xl font-bold'>Ringa</h1>
        </div>
        <ConnectButton showBalance={false} />
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className='text-5xl font-extrabold'>Games</h1>
        <div className='flex items-center justify-center gap-4'>
          <img onClick={() => setGame('TicTacToe')} src='https://i.imgur.com/L7bv9xw.png' className='w-36 h-36 rounded-full' alt='tictactoe' />
          <img onClick={() => setGame('Snake')} src='https://i.imgur.com/L7bv9xw.png' className='w-36 h-36 rounded-full' alt='tictactoe' />
          <img onClick={() => setGame('TRex')} src='https://i.imgur.com/L7bv9xw.png' className='w-36 h-36 rounded-full' alt='tictactoe' />
        </div>
      </div>

      <div className='flex items-center justify-center py-4 md:py-8'>
        {game && <p>{game}</p>}
      </div>
    </div>
  );
}

export default App;