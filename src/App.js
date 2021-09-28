import {useState} from "react";
import './App.css';

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,1,2],
  [0,4,8],
  [0,1,2],
  [2,4,6]

];


const calculateWinner = (board) => {
for (const combination of winningCombinations){
  const [first, second, third] = combination;
  if(board[first] &&
    board[first] === board[second] &&
     board[first] === board[third]
  ){
    return {
      winner: board[first],
      winningSquares: [first, second, third],
    };
    }
  }
  return {
    winner: null,
    winningSquares: [],
  }
}

const initialBoard = Array(9).fill(null);

function App() {

const [player, setPlayer] = useState(null);
const [players, setPlayers] = useState({playerOne: "", playerTwo: ""});
const [board, setBoard] = useState(initialBoard);
const {winner, winningSquares} = calculateWinner(board);
const [started, setStarted] = useState(false)
const [count, setCount] = useState(0);


const nextPLayer  = player === players.playerOne ? players.playerTwo : players.playerOne;

const addplayer = (event) =>{
  const inputName = event.target.name;
  const inputValue = event.target.value;
  setPlayers((prev) => ({...prev, [inputName] : inputValue}))
}
const handleClick = (index) => {
  if(board[index] || winner){
    return;
  }
  const boardStatus = [...board];
  boardStatus[index] = player;
  console.log(boardStatus);
  setBoard(boardStatus);
  setPlayer(nextPLayer);
  setCount(count + 1);
}
const initGame = (event) =>{
  event.preventDefault();
  setPlayer(Object.values(players)[Math.floor(Math.random(0,1)*2)]);
  resetGame();
}

const resetGame = () => {
  setBoard(initialBoard);
  setStarted(true);
  setPlayer(Object.values(players)[Math.floor(Math.random(0,1)*2)]);
}

const isDisabled = () => !players.playerOne || !players.playerTwo;
  return (
<>
<h1>Tic-tac-toe</h1>
{!started? (
  <form onSubmit={initGame}>
<label htmlFor="playerOne">Add player one</label>
<input
name="playerOne" 
id="playerOne"
type="text"
value={players.playerOne}
onChange={addplayer}
/>
<label htmlFor="playerTwo">Add player two</label>
<input
name="playerTwo"
id="playerTwo"
type="text"
value={players.playerTwo}
onChange={addplayer}
/>
<button type="submit" disabled={isDisabled()}>Start game</button>
</form>

) : null}

<section><p>Current player {player}</p>

{board?.length > 0 ?(
<ul id="board">
{board.map((item, index) => (
  <li className="square" key={index}>
    <button type="button" onClick={() => handleClick(index)}>
    {item || index }
    </button>
    </li>
))}
</ul>)
: null}
</section>
{count === 9 ? (
  <section>
    <p>Ingen vant, prøv igjen!</p>
    <button type="button" onClick={resetGame}>Spill igjen</button>
  </section>

) : null}
{winner ? (
  <section>
    <p>
      Gratulerer {winner} med kombinasjonen {winningSquares}
    </p>
    <button type="button" onClick={resetGame}>Spill igjen!</button>
  </section>
):null}
</>
  );
}

export default App;
