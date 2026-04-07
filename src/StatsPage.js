import "./styles.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteResult } from "./scoreListSlice";
import { useState, useEffect } from "react";
import { formatDate, formatTime } from "./basicMethods";

export default function StatsPage() {
  let results = useSelector((state) => state.scoreList.results);
  let dispatch = useDispatch();

  let [bestResult, setBestResult] = useState(() => {
    let best = localStorage.getItem("bestResult");
    return best ? JSON.parse(best) : null;
  });

  useEffect(() => {
    if (results.length === 0) return;

    let best = results.reduce(
      (best, curr) => (curr.score > best.score ? curr : best),
      results[0]
    );

    setBestResult((prev) => {
      if (!prev || !prev.score || best.score > prev.score) {
        localStorage.setItem("bestResult", JSON.stringify(best));
        return best;
      }
      return prev;
    });
  }, [results]);

  return (
    <div className="stats--container">
      <h3 className="stats--label">The Best Result</h3>
      <div className="stats--grid">
        {bestResult ? (
          <>
            <p>
              <b>Date:</b> {formatDate(bestResult.id)}
            </p>
            <p>
              <b>Score:</b> {bestResult.score}
            </p>
            <p>
              <b>Time:</b> {formatTime(bestResult.time)}
            </p>
          </>
        ) : (
          <p className="stats--empty">EMPTY</p>
        )}
      </div>

      <h3 className="stats--label">Results</h3>
      <div className="stats--grid">
        {results.length > 0 && (
          <div className="stats--item">
            <h3>Date</h3>
            <h3>Score</h3>
            <h3>Time</h3>
          </div>
        )}

        {results.length <= 0 && <p className="stats--empty">EMPTY</p>}

        {results.map((item) => (
          <div key={item.id} className="stats--item">
            <p>{formatDate(item.id)}</p>
            <p>{item.score}</p>
            <p>{formatTime(item.time)}</p>
            <button
              className="stats--delete"
              onClick={() => dispatch(deleteResult(item.id))}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <Link to="/">
        <button className="stats--back">⇐ Back</button>
      </Link>
    </div>
  );
}
