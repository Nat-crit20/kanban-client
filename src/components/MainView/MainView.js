import { useEffect, useState } from "react";
import { WelcomeView } from "../Welcome/WelcomeView";
import { HomeView } from "../HomeView/HomeView";
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedUser || null);
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState();
  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    if (!token || !user) {
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
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setBoards(data.Board);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token, user]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <div className={`App ${colorMode}`}>
      {user ? (
        <>
          <HomeView
            user={user}
            updateColorMode={() => {
              setColorMode((prev) => (prev === "light" ? "dark" : "light"));
            }}
            colorMode={colorMode}
            currentBoard={currentBoard}
            updateCurrentBoard={(data) => {
              setCurrentBoard((prevBoard) => ({
                ...prevBoard,
                ...data,
              }));
            }}
            removeBoardFromList={(boardID) => {
              setBoards((prev) => {
                return prev.filter((b) => {
                  return b._id !== boardID;
                });
              });
            }}
            logout={logout}
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
