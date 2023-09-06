import { useEffect, useState } from "react";
import { WelcomeView } from "../Welcome/WelcomeView";
import { HomeView } from "../HomeView/HomeView";
export const MainView = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <>
          <h1>Welcome user</h1>
          <HomeView
            user={user}
            currentBoard={board}
            token={token}
            updateBoard={(board) => {
              setBoard(board);
            }}
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
