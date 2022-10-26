import React, { useState } from 'react';

function App() {
    const [nextPlayer, setNextPlayer] = useState('X');
    const [squareArray, setSquareArray] = useState([]);
    const [curStageCount, setCurStageCount] = useState(0);
    const [winner, setWinner] = useState('');

    const index2value = {};
    const squareList = [];
    squareArray.forEach((e, i) => {
        if (i < curStageCount) {
            index2value[e.id] = e.value;
        }
    });
    for (let i = 0; i < 9; i++) {
        squareList.push(
            <button
                id={`square-${i}`}
                className="square"
                onClick={(e) => {
                    if (!e.target.textContent && !winner) {
                        const newSquareArray = [
                            ...squareArray,
                            { id: e.target.id.split('-')[1], value: nextPlayer },
                        ];
                        setSquareArray(newSquareArray);
                        setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
                        setCurStageCount(newSquareArray.length);
                        const winner = findWinner(newSquareArray);
                        if (winner) {
                            setWinner(winner);
                        }
                    }
                }}
            >
                {index2value[i] ? index2value[i] : ''}
            </button>,
        );
    }
    const stages = squareArray.map((e, i) => {
        return (
            <li key={`stage-button-${i}`}>
                <button onClick={() => setCurStageCount(i + 1)}>Go to move #{i + 1} </button>
            </li>
        );
    });
    return (
        <div className="game">
            <div className="board">{squareList}</div>
            <div>
                <p>{winner ? `Winner is ${winner}` : `Next player: ${nextPlayer}`} </p>
                <ol>
                    <li key="game_start">
                        <button
                            onClick={() => {
                                setSquareArray([]);
                                setWinner('');
                            }}
                        >
                            Go to game start
                        </button>
                    </li>
                    {stages}
                </ol>
            </div>
        </div>
    );
}

export default App;

function findWinner(squareList) {
    if (squareList.length < 5) {
        return '';
    }
    squareList.sort((a, b) => {
        return Number(a.id) - Number(b.id);
    });
    const xSquares = [];
    const oSquares = [];
    squareList.forEach((e) => {
        if (e.value === 'X') {
            xSquares.push(e);
        } else {
            oSquares.push(e);
        }
    });
    if (findWinnerSingle(xSquares)) {
        return 'X';
    } else if (findWinnerSingle(oSquares)) {
        return 'O';
    } else {
        return '';
    }
}

function findWinnerSingle(squares) {
    if (squares.length < 3) {
        return false;
    }
    for (let i = 0; i < squares.length - 2; i++) {
        const diff1 = Number(squares[i + 1].id) - Number(squares[i].id);
        const diff2 = Number(squares[i + 2].id) - Number(squares[i + 1].id);
        if (diff1 === diff2 && diff1 > 0 && diff1 < 5) {
            return true;
        }
    }
}
