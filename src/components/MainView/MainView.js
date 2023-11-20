import Container from "react-bootstrap/Container";
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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token, user]);

  const logOut = () => {
    localStorage.clear();
  };

  return (
    <div className="App">
      <Container className="m-0 p-0" fluid>
        {user ? (
          <>
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
      </Container>
    </div>
  );
};
