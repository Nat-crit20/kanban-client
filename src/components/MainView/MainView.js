import { useState } from "react";
import "./App.css";
import { WelcomeView } from "./components/Welcome/WelcomeView";

export const MainView = () => {
  const [token, setToken] = useState();
  const [user, setUser] = useState({});
  const [boards, setBoards] = useState([]);

  return (
    <div className="App">
      <WelcomeView
        onLogin={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    </div>
  );
};
