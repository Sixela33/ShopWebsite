import React from "react";
import "./Login.css";
import GoogleLogin from "react-google-login";

export const Login = ({ data, setData }) => {
  const handleSuccess = async (response) => {
    console.log(response);
    const res = await fetch("auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: response.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleFailure = (response) => {
    alert(response);
  };

  const handleLogout = () => {
    setData(null);
    localStorage.removeItem("loginData");
  };

  return (
    <>
      <div className="container">
        <h1>ResourceManager</h1>
        <p>A place to trade with others</p>
        {data ? (
          <div>
            <h3>You are logged in as {data.email}</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <GoogleLogin
            clientId="96557461671-4c5gd646tcivd2dgak5og04s6qdnlfl4.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </>
  );
};
