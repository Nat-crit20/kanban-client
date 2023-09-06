import { LoginView } from "../Login/LoginView";
import { SignUpView } from "../SignUp/SignUpView";

export const WelcomeView = ({ onLogin }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <SignUpView />
      <LoginView onLogin={onLogin} />
    </div>
  );
};
