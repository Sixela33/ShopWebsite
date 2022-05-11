import React from "react";

export const UserInfo = ({ userData }) => {
  console.log(userData.image);

  return (
    <div className="user-info">
      <img
        src={userData.image}
        alt="ImageNotFound"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAADn5+fZ2dlhYWH19fXh4eHx8fHS0tL5+fm+vr7Ozs5paWnV1dWrq6tSUlIlJSWUlJRFRUWdnZ24uLh2dnYQEBAVFRXGxsaOjo4fHx97e3ulpaU3Nzezs7M8PDxCQkJjY2NxcXFMTEyDg4MsLCwxMTHlJWNTAAADCklEQVR4nO3bYVeqQBDGcRAVhTRNLdNMs+z7f8R7E8HZc22hG4Iz5/97676Y57DsrAsEAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaFUcLefzeRJ12i7kCuLBbDEJzw77WdRru6j6dMbd8ILH/dxGyPT+UrzM06Lfdnm/lky+z3d0rztj/+EcZXs3Xaaj0ShNnrsrmXEdt13m/xsXKXYvzqXqpXdyri7bKvC3FsXlG/z7Y/9dZJw1X1wd9nn948u/T7VHXOfVR9+NGIuISZOl1eMlr/3CDM09i4jq9jlRXvmLb9ROdI2mKqtL3gYnQ9+opbiIyhbUWV733j9uc064aaaymgyLlj71D5SLTdpMbfVIwooJ+yLhopna6vFWlN0tGSkSThoprR69Q1H2Y8mmU2xcv2+ct6cjyi6ZpnsxVNFqKhM+etvFedENVW3dZMLw1TtUbk4VLTWxTOhfa+Q1XDdUXh3k+hF6R8r7UNE1dOaef8O5rb4o3RQ5Tf33obzYqv5BnTc1795xkUw4aqi4erzmc7R6s1j5h96czsc2nHT9UzQIDiJh2QbvBsWlR9qJCKjrNqxqJxO2Xcw1yKaiac9W2UAGLNm/quTsXkvapkp9J6DChbSMs4yGBxtPEqW1E3Cl+PHTZdGnE/Dd3CrjdAld/ykqcZ6r/V1j1D2xKDNz8t15HtzoFMv3FlZTcyuM3MasFqqO8Ss6N8FuYq8DBuIKdhUdb/9EsRFVdLj9M29Zvgd7y8vJ6dTp0+QNeHTaiup+y8srey783HYZ19PLLqHZmzAIUqv/dAvZGbHF86ZcllDXyf3PjK3fhtmLbmUvLqh2nKUbc+cVgv2E86+EW8sJB9bbYTDsfGm7CgBQrrdMjB6xZdIH43/xi49HNkZbovg6xubW1Hlmb3Kiyq8Nw9DigakT0OKhvvvmjP9jL51i8wmDJyehxb7vvD3zZLFdODeiuZdLjsRXeOo+Fq1obD1gEETHrr+dt13HVfUji2sMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa/QGePhVu/RHs0wAAAABJRU5ErkJggg==";
        }}
        width={"144px"}
        height={"144px"}
      ></img>
      <p>User: {userData.displayName}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};
