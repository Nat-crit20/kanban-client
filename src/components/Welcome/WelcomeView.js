import { LoginView } from "../Login/LoginView";
import { SignUpView } from "../SignUp/SignUpView";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
              <Nav.Link href="#login">Get started</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="home">
        <div>
          <h1>Kanban Board</h1>
          <p>
            Lorem ipsum dolor sit amet, duo aliquam delicata an, id primis
            definitionem eum. Usu perfecto consulatu ne, dicat legere volutpat
            vix ut. Diam inciderint ne ius, ei est malorum nominati. Duo at
            assentior expetendis conclusionemque, exerci appetere ius ut.
          </p>
        </div>

        <div className="image"></div>
      </div>
      <div className="spacer layer1"></div>
      <div id="login">
        <div className="welcome-actions">
          <h2>You can get started by:</h2>
          <div>
            <SignUpView />
            <h3>or</h3>
            <LoginView onLogin={onLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
