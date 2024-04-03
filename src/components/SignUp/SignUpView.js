import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API } from "../../constants";
import "./SignUpView.scss";

export const SignUpView = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: username,
      Email: email,
      Password: password,
    };
    fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("Sign up Succeeded");
          return setShow(false);
        }
      })
      .catch((error) => {
        alert("Sign up failed");
        console.log(error);
      });
  };

  return (
    <>
      <button className="signup-btn" onClick={handleShow}>
        Sign up
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="post" className="form-signup" onSubmit={handleSubmit}>
            <div className="form-signup-username">
              <label htmlFor="username">Enter your username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-signup-email">
              <label htmlFor="email">Enter your email: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-signup-password">
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
            <div className="form-signup-submit-container">
              <input
                className="form-signup-submit"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
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
