import { LoginView } from "../Login/LoginView";
import { SignUpView } from "../SignUp/SignUpView";
import "./WelcomeView.scss";
export const WelcomeView = ({ onLogin }) => {
  return (
    <div className="welcome-view">
      <h1>Welcome to Kanban</h1>
      <div className="welcome-actions">
        <SignUpView />
        <LoginView onLogin={onLogin} />
      </div>
    </div>
  );
};
