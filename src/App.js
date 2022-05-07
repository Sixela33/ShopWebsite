import { useState } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import Modal from "./Modal";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  return (
    <>
      <NavBar data={loginData} setData={setLoginData} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home data={loginData} setData={setLoginData} />}
        ></Route>
        <Route
          path="/Profile/:id"
          element={<Profile data={loginData} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
