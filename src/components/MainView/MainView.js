import { useEffect, useState } from "react";
import { WelcomeView } from "../Welcome/WelcomeView";
import { HomeView } from "../HomeView/HomeView";
export const MainView = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/user/${user._id}/board`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBoards(data.Board);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, user]);

  return (
    <div className="App">
      {user ? (
        <>
          <h1>Welcome user</h1>
          <HomeView
            user={user}
            currentBoard={currentBoard}
            boards={boards}
            token={token}
            updateUser={(user) => {
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
            }}
          />
        </>
      ) : (
        <WelcomeView
          onLogin={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      )}
    </div>
  );
};
