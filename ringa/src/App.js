import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContract, useSigner } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './Contract/contract'

function App() {
	const games = [
		{
			tokenId: "2",
			ipfs: "bafybeibvbr2zjvuzdakvbdp6y4gb73mecw5os3relrcmv7mevlgsofn6da",
		},
		{
			tokenId: "1",
			ipfs: "bafybeiawvohuyo5hkfjzolpvymdnbjjslwzin744lwlnclru2b2pcyk5mu",
		},
	];

	const [game, setGame] = useState(0);

	return (
		<div className="bg-black text-white min-h-screen">
			<div className="flex items-center justify-between px-4 py-2">
				<div>
					<h1 className="text-xl font-bold">Ringa</h1>
				</div>
				<ConnectButton showBalance={false} />
			</div>

			<div className="flex flex-col items-center justify-center gap-6">
				<h1 className="text-5xl font-extrabold">Games</h1>
				<div className="flex items-center justify-center gap-4">
					<img
						onClick={() => setGame(0)}
						src="https://i.imgur.com/L7bv9xw.png"
						className="w-36 h-36 rounded-full cursor-pointer"
						alt="tictactoe"
					/>
					<img
						onClick={() => setGame(1)}
						src="https://i.imgur.com/5L58LeU.png"
						className="w-36 h-36 rounded-full cursor-pointer"
						alt="snake game"
					/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center py-4 md:py-8 gap-4">
				<div className="w-2/4">
					<iframe
						title="game-iframe"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						frameborder="0"
						height="100%"
						sandbox="allow-scripts"
						src={`https://ipfs.io/ipfs/${games[game].ipfs}`}
						width="100%"
						style={{ minHeight: "500px" }}
					/>
				</div>
        <button className="px-8 py-4 bg-white text-black rounded-xl transform hover:scale-105">Mint</button>
			</div>
		</div>
	);
}

export default App;
