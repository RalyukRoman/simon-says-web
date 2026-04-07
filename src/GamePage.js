import "./styles.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addResult } from "./scoreListSlice";
import { FinishGame, GameOver } from "./GameModals";
import { delay } from "./basicMethods";

const colors = ["red", "khaki", "green", "blue", "gray"];

export default function GamePage() {
  const dispatch = useDispatch();

  let [sequence, setSequence] = useState([]);
  let [currentBulb, setCurrentBulb] = useState(-1);
  let [userBulb, setUserBulb] = useState(-1);
  let [levelStats, setLevelStats] = useState({ burning: 3.0, count: 1 });
  let [hintStats, setHintStats] = useState({ show: false, count: 3 });
  let [gameOver, setGameOver] = useState(false);
  let [finishGame, setFinishGame] = useState(false);
  let [repeating, setRepeating] = useState(true);
  let [score, setScore] = useState(0);
  let [time, setTime] = useState(0);

  const restartGame = () => {
    setSequence([]);
    setUserBulb(-1);
    setLevelStats({ burning: 3.0, count: 1 });
    setHintStats({ show: false, count: 3 });
    setRepeating(true);
    setScore(0);
    setTime(0);
    setFinishGame(false);
    setGameOver(false);
  };

  const createSequence = (stats) => {
    setRepeating(true);
    let newSequence = [];

    for (let i = 0; i < stats.count; i++) {
      let rand = Math.floor(Math.random() * colors.length);
      newSequence.push(rand);
    }

    setSequence(newSequence);
    repeatSequence(newSequence, stats);
  };

  const repeatSequence = async (selSequence, stats) => {
    for (let i = 0; i < stats.count; i++) {
      await delay(1000);
      setCurrentBulb(selSequence[i]);
      await delay(1000 * stats.burning);
      setCurrentBulb(-1);
    }

    setRepeating(false);
  };

  const checkBulb = (bulbId) => {
    if (repeating || gameOver) return;

    setUserBulb(bulbId);

    if (sequence[0] === bulbId) {
      if (sequence.length === 1) nextSequence();
      else setSequence(sequence.slice(1));
    } else {
      setGameOver(true);

      if (score > 0) {
        dispatch(addResult({ score: score, time: time }));
      }
    }

    if (hintStats.show)
      setHintStats((prev) => {
        let newValue = { show: false, count: prev.count };
        return newValue;
      });
  };

  const nextSequence = () => {
    setScore((prev) => prev + 1);

    setLevelStats((prev) => {
      let next = {
        burning: prev.burning * 0.9,
        count: prev.count + 1,
      };

      createSequence(next);
      return next;
    });
  };

  useEffect(() => {
    if (gameOver) return;

    let id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    createSequence(levelStats);
    return () => clearInterval(id);
  }, [gameOver]);

  useEffect(() => {
    if (userBulb === -1) return;
    let id = setTimeout(() => setUserBulb(-1), 1000);
    return () => clearTimeout(id);
  }, [userBulb]);

  return (
    <div className="game--container">
      <div className="game--stats">
        <p>Score: {score}</p>
        <p>
          Time: {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(time % 60).padStart(2, "0")}
        </p>
      </div>

      <button
        className="game--button__hint"
        onClick={() => {
          if (hintStats.count > 0)
            setHintStats((prev) => {
              let newValue = { show: true, count: prev.count - 1 };
              return newValue;
            });
        }}
        disabled={hintStats.show || repeating || gameOver}
      >
        <b>{hintStats.count}</b> ❔ Hint
      </button>

      <button
        className="game--button__exit"
        onClick={() => setFinishGame(true)}
      >
        ❌ Finish
      </button>

      <div className="game--row">
        {colors.map((item, id) => (
          <div
            key={id}
            className="game--bulb"
            style={{
              backgroundColor: item,
              opacity: currentBulb === id ? 1 : 0.3,
            }}
          ></div>
        ))}
      </div>

      <h3>{gameOver ? "Game Over" : repeating ? "Wait" : "Play"}</h3>
      <div className="game--row" style={{ marginBottom: "20px" }}>
        {colors.map((item, id) => (
          <button
            key={id}
            className="game--button"
            style={{
              backgroundColor: item,
              opacity: userBulb === id ? 1 : 0.3,
            }}
            onClick={() => checkBulb(id)}
            disabled={repeating || gameOver || finishGame}
          ></button>
        ))}
      </div>

      <div className="game--row">
        {colors.map((item, id) => (
          <p
            key={id}
            className="game--hint"
            style={{
              color: item,
              opacity: hintStats.show && sequence[0] === id ? 1 : 0,
            }}
          >
            ▲
          </p>
        ))}
      </div>

      {gameOver && (
        <GameOver score={score} time={time} onRestart={restartGame} />
      )}

      {finishGame && (
        <FinishGame
          score={score}
          time={time}
          onClose={() => setFinishGame(false)}
        />
      )}
    </div>
  );
}
