import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const aiPlayer = "O"
	const huPlayer = "X"
	let initialState = ["", "", "", "", "", "", "", "", ""];
	const [gameState, setGameState] = useState(initialState);
	const [winnerStatus, setWinnerStatus] = useState("");
	const [tieHand, setTieHand] = useState(0)
	const [winState, setWinState] = useState([])
	
	const emptySquares = (strings) => {
		const arr = ["", "", "", "", "", "", "", "", ""]
		const empty = []
		for(let i = 0; i < arr.length; i++) {
			if(arr[i] === strings[i]) {
				empty.push(i)
			}
		}

		return empty
	}
	
	const minmax = (arr, player) => {
		let strings = [...arr]
		const availSpots = emptySquares(strings)
		// console.log("EMo ", availSpots)
		const winner = checkWinner(strings);
		const tie = checkTie(strings)
		if(tie===9) {
			if (winner.length > 0 && winner[0] === huPlayer) {
				return { score: -10 }
				//   clearHandler()
			} else if(winner.length > 0 && winner[0] === aiPlayer) {
				return { score: 10}
			} else {
				return { score: 0 }
			}
		} else if(winner.length > 0) {
			if (winner[0] === huPlayer) {
				return { score: -10 }
				//   clearHandler()
			} else if(winner[0] === aiPlayer) {
				return { score: 10}
			}
		} 
		
		if(availSpots.length === 0) {
			return { score: 0 }
		}

		let moves = []
		for(let i = 0; i < availSpots.length; i++) {
			let move = {}
			move.index = availSpots[i]
			strings[availSpots[i]] = player
			if(player === aiPlayer) {
				let result = minmax(strings, huPlayer)
				move.score = result.score
			} else {
				let result = minmax(strings, aiPlayer)
				move.score = result.score
			}

			strings[availSpots[i]] = ''
			moves.push(move)
		}

		
		let bestMove;
		if(player === aiPlayer) {
			let bestScore = -1000000
			for(let i = 0; i<moves.length; i++) {
				if(moves[i].score > bestScore) {
					bestScore = moves[i].score
					bestMove = i
				}
			}
		} else {
			let bestScore = 1000000
			for(let i = 0; i<moves.length; i++) {
				if(moves[i].score < bestScore) {
					bestScore = moves[i].score
					bestMove = i
				}
			}
		}

		// console.log(moves)
		// console.log(moves[bestMove])
		return moves[bestMove]
	}

	const bestSpot = (strings) => {
		// console.log(tieHand)
		let randNoise = [0, 1]
		if(tieHand >= randNoise[Math.floor(Math.random()*randNoise.length)]) {
			// console.log("Best")
			const minmaxAns = minmax(strings, aiPlayer)
			return minmaxAns.index
		} else {
			// console.log("Ran")
			const arr = emptySquares(strings)
			return arr[Math.floor(Math.random()*arr.length)]
		}
		// console.log(minmaxAns) 
		// console.log(minmaxAns.index) 
	}

	const onSquareClick = (index) => {
		if (gameState[index] !== huPlayer && gameState[index] !== aiPlayer) {
			let strings = Array.from(gameState);
			strings[index] = huPlayer;
			// let randomIndex = Math.floor(Math.random() * 9);
			// while (strings[randomIndex] !== "") {
			// 	randomIndex = Math.floor(Math.random() * 9);
			// }
			const bestIndex = bestSpot(strings)
			// console.log(bestIndex)
			strings[bestIndex] = aiPlayer;
			// strings[randomIndex] = aiPlayer;
			// console.log(strings)
			setGameState(strings);
		}
	};

	const clearHandler = () => {
		setGameState(initialState);
		setWinState([])
	};

	const checkWinner = (strings) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				strings[a] &&
				strings[a] === strings[b] &&
				strings[a] === strings[c]
			) {
				return [a, b, c];
			}
		}
		return [];
	};

	const playAgainHandler = () => {
		setWinnerStatus("");
		clearHandler();
	};

	const checkTie = (strings) => {
		let tie = 0
		for(let ass of strings) {
			if(ass === 'X' || ass === 'O') {
				tie++
			}
		}
		return tie
	}

	useEffect(() => {
		const winner = checkWinner(gameState);
		// console.log(winner)
		let tie = checkTie(gameState)
		setTieHand(tie)
		if (winner.length > 0) {
			setWinState([winner[0], winner[1], winner[2]])
			setWinnerStatus(gameState[winner[0]]);
			//   clearHandler()
		}
	}, [gameState]);

	useEffect(() => {
		if(tieHand === 9) {
			const winner = checkWinner(gameState);
			if (winner.length > 0) {
				setWinState([winner[0], winner[1], winner[2]])
				setWinnerStatus(gameState[winner[0]]);
				//   clearHandler()
			} else {
				setWinnerStatus('T')
			}
		}
		
	}, [tieHand])

	const DefaultComponent = () => (
		<div>
			<h1 className="heading-text">Tic Tac Toe</h1>
			<div className="row jc-center">
				<div
					onClick={() => onSquareClick(0)}
					className={`square text ${
						(winState.includes(0)) && "square-winner"
					} ${gameState[0] === 'X' ? 'x-color' : 'o-color'}`
					}
				>
					<p className="text p-span">{gameState[0]}</p>
				</div>
				<div
					onClick={() => onSquareClick(1)}
					className={`square text ${
						(winState.includes(1)) && "square-winner"
					} ${gameState[1] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[1]}</p>
				</div>
				<div
					onClick={() => onSquareClick(2)}
					className={`square text ${
						(winState.includes(2)) && "square-winner"
					} ${gameState[2] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[2]}</p>
				</div>
			</div>
			<div className="row jc-center">
				<div
					onClick={() => onSquareClick(3)}
					className={`square text ${
						(winState.includes(3)) && "square-winner"
					} ${gameState[3] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[3]}</p>
				</div>
				<div
					onClick={() => onSquareClick(4)}
					className={`square text ${
						(winState.includes(4)) && "square-winner"
					} ${gameState[4] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[4]}</p>
				</div>
				<div
					onClick={() => onSquareClick(5)}
					className={`square text ${
						(winState.includes(5)) && "square-winner"
					} ${gameState[5] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[5]}</p>
				</div>
			</div>
			<div className="row jc-center">
				<div
					onClick={() => onSquareClick(6)}
					className={`square text ${
						(winState.includes(6)) && "square-winner"
					} ${gameState[6] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[6]}</p>
				</div>
				<div
					onClick={() => onSquareClick(7)}
					className={`square text ${
						(winState.includes(7)) && "square-winner"
					} ${gameState[7] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[7]}</p>
				</div>
				<div
					onClick={() => onSquareClick(8)}
					className={`square text ${
						(winState.includes(8)) && "square-winner"
					} ${gameState[8] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[8]}</p>
				</div>
			</div>

			<div>
				<button onClick={clearHandler} className="clear-button">
					Clear
				</button>
			</div>
		</div>
	);

	const WinnerComponent = () => (
		<div className="winner-component">
			<h1 className="heading-text text ">
				{
					winnerStatus === 'T' ? (
						"It's a tie👔"
					) : (
						winnerStatus === 'X' ? (
							'You Won 🎉'
						) : (
							'You Lost 🤕'
						)
					)
				}
			</h1>
			<button onClick={() => playAgainHandler()} className="play-again-button">
				Play Again
			</button>
		</div>
	);

	return (
		<div className="app-header">
			<main>
				<DefaultComponent />
				{(winnerStatus === "T" || winnerStatus === huPlayer || winnerStatus === aiPlayer) && <WinnerComponent />}
			</main>
		</div>
	);
}

export default App;