import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./feature/HomePae";
import HomePageMain from "./feature/HomePage";
import LoginAR from "./feature/LoginAR";
import Upload from "./feature/Upload";
import { getData } from "./store";
import Detail from "./feature/Detail";
import Trending from "./feature/Trending";
import MyAcount from "./feature/MyAcount";
import ScrollToTop from "./component/scrollTop";

function App() {
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(getData());
  }, []);
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route path="upload" element={<Upload />} />
          <Route path="" element={<HomePageMain />} />
          <Route path="/book/:id" element={<Detail />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/account" element={<MyAcount />} />

          {/* something like that */}
        </Route>
        <Route path="/login" element={<LoginAR />}></Route>
      </Routes>
    </div>
  );
}

export default App;
