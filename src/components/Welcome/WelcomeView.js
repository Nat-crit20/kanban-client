import { LoginView } from "../Login/LoginView";
import { SignUpView } from "../SignUp/SignUpView";

export const WelcomeView = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <SignUpView />
      <LoginView />
    </div>
  );
};
