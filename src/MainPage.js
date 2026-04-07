import "./styles.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main--container">
      <h2>Simon says</h2>
      <div className="main--list">
        <Link to="/game">
          <button className="main--button">Start Game</button>
        </Link>
        <Link to="/stats">
          <button className="main--button">Statistics</button>
        </Link>
      </div>
    </div>
  );
}
