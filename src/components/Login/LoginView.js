import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API } from "../../constants";
import "./LoginView.scss";

export const LoginView = ({ onLogin }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          alert("Login successful");
          setShow(false);
          onLogin(data.user, data.token);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed");
      });
  };

  return (
    <>
      <button className="login-btn" onClick={handleShow}>
        Login
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <form method="post" className="form-login" onSubmit={handleSubmit}>
              <div className="form-login-username">
                <label htmlFor="name">Enter your username: </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-login-password">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-login-submit-container">
                <input
                  className="form-login-submit"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
