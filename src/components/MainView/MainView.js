import { useEffect, useState } from "react";
import { WelcomeView } from "../Welcome/WelcomeView";
import { HomeView } from "../HomeView/HomeView";
export const MainView = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [board, setBoard] = useState([]);

  const openCreateBoard = () => {};
  return (
    <div className="App">
      {user ? (
        <>
          <h1>Welcome user</h1>
          <HomeView
            user={user}
            currentBoard={board}
            updateBoard={(board) => {
              setBoard(board);
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
