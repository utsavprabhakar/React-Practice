import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import log from "loglevel";

log.enableAll();

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      turn: "X",
    };
  }

  handleClick(i) {
    console.log(this.state.history[0]);
    const history = this.state.history;
    const length = history.length;
    const squares = history[length - 1].squares.slice();
    const winner = this.checkWinner(squares);
    if (winner) return;
    if (squares[i] === null) {
      squares[i] = this.state.turn;
      this.setState({
        turn: this.state.turn === "X" ? "O" : "X",
        history: history.concat([
          {
            squares: squares,
          },
        ]),
      });
    }
  }

  render() {
    let status = "";
    let lastIndex = this.state.history.length - 1;
    const winner = checkWinner(this.state.history[lastIndex].squares);
    if (winner) {
      status = "Winner is ...." + winner;
    } else {
      status = "Next player is " + this.state.turn;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.history[lastIndex].squares}
            status={status}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function checkWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
