import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./feature/HomePae";
import LoginAR from "./feature/LoginAR";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginAR />}></Route>
        <Route path="" element={<HomePage />}>
          {/* something like that */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
