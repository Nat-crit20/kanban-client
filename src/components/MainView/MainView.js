import { useEffect, useState } from "react";
import { WelcomeView } from "../Welcome/WelcomeView";
export const MainView = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);

  return (
    <div className="App">
      {user ? (
        <h1>Welcome user</h1>
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
