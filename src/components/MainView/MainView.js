import { useEffect, useState } from "react";
import { WelcomeView } from "../Welcome/WelcomeView";
import { HomeView } from "../HomeView/HomeView";
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedUser || null);
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState();

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

  const fetchBoard = (id) => {
    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/board/${id}`,
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
        setCurrentBoard(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {user ? (
        <>
          <h1>Welcome user</h1>
          <HomeView
            user={user}
            currentBoard={currentBoard}
            updateCurrentBoard={(board) => {
              setCurrentBoard(board);
            }}
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
            setCurrentBoard(user.Board[0]);
          }}
        />
      )}
    </div>
  );
};
