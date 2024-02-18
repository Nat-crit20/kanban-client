import { LoginView } from "../Login/LoginView";
import { SignUpView } from "../SignUp/SignUpView";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as LogoForLight } from "../../assets/logo-dark.svg";
import "./WelcomeView.scss";
export const WelcomeView = ({ onLogin }) => {
  return (
    <div className="welcome-view">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <LogoForLight />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="https://nat-crit20.github.io/Portfolio_Website/">
                Portfolio
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="home">
        <div>
          <h1>Kanban Board</h1>
          <p>
            Brings all your tasks, teammates, and tools together. Keep
            everything in the same place—even if your team isn’t.
          </p>
          <div className="welcome-actions">
            <div>
              <SignUpView />
              <LoginView onLogin={onLogin} />
            </div>
          </div>
        </div>

        <div className="image"></div>
      </div>
      <div className="spacer layer1"></div>
      <div id="about">
        <div className="kanban-info">
          <div className="info-card">
            <p>Boards</p>
            <p>
              Keep all of your tasks organized and work moving forward. In a
              glance, see everything from "things to do" to "aww yeah, we did
              it!"
            </p>
          </div>
          <div className="info-card">
            <p>Lists</p>
            <p>
              The different stages of a task. Start as simple as To Do, Doing or
              Done-or build a workflow custom fit to your needs.
            </p>
          </div>
          <div className="info-card">
            <p>Cards</p>
            <p>
              Cards represent tasks and idead and hold all the information to
              get the job done. As you make progress, move cards across lists to
              show their status.
            </p>
          </div>
        </div>
        <div className="about-image-container">
          <img src={require("../../assets/preview.jpg")} alt="" />
        </div>
      </div>
    </div>
  );
};
