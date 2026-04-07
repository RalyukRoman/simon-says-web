import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import GamePage from "./GamePage";
import MainPage from "./MainPage";
import StatsPage from "./StatsPage";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}
