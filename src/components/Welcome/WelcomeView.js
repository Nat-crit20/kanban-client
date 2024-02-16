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
              <Nav.Link href="#home">Contact</Nav.Link>
              <Nav.Link href="#link">Get started</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Welcome to Kanban</h1>
      <div className="welcome-actions">
        <SignUpView />
        <LoginView onLogin={onLogin} />
      </div>
      <div className="image"></div>
      <div className="spacer layer1"></div>
    </div>
  );
};
