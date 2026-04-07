import "./styles.css";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addResult } from "./scoreListSlice";

export function FinishGame({ score, time, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal>
      <h3>Do you want to end the game?</h3>
      {score > 0 && <p>Current score will be saved</p>}
      <div className="modal--list">
        <button
          className="modal--button"
          onClick={() => {
            if (score > 0) dispatch(addResult({ score: score, time: time }));
            navigate("/", { replace: true });
          }}
        >
          Yes
        </button>
        <button className="modal--button" onClick={onClose}>
          No
        </button>
      </div>
    </Modal>
  );
}

export function GameOver({ score, time, onRestart }) {
  const navigate = useNavigate();

  return (
    <Modal>
      <h3 className="modal--label">Game Over</h3>
      <p>Score: {score}</p>
      <p>
        Time: {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")}
      </p>
      <div className="modal--list">
        <button
          className="modal--button"
          onClick={() => navigate("/", { replace: true })}
        >
          Exit
        </button>
        <button className="modal--button" onClick={onRestart}>
          Restart
        </button>
      </div>
    </Modal>
  );
}
