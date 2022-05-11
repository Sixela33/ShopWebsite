import { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";

function App() {
  const [loginData, setLoginData] = useState(
    window.localStorage.getItem("loginData")
      ? JSON.parse(window.localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    setLoginData(
      window.localStorage.getItem("loginData")
        ? JSON.parse(window.localStorage.getItem("loginData"))
        : null
    );
  }, []);

  return (
    <>
      <NavBar data={loginData} setData={setLoginData} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home data={loginData} setLoginData={setLoginData} />}
        ></Route>
        <Route
          path="/Profile/:id"
          element={<Profile data={loginData} setLoginData={setLoginData} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
