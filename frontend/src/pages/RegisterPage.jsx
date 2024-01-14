import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const RegisterPage = () => {
  let [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmation: "",
  });
  let [alertMessage, setAlertMessage] = useState(null);

  let registerUser = async () => {
    const response = await fetch("http://127.0.0.1:8000/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (data === "User added successfully!") {
      setAlertMessage({
        message: data,
        variant: "success",
      });
    } else {
      setAlertMessage({
        message: data,
        variant: "danger",
      });
    }
  };

  let handleChange = (event) => {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    registerUser();
  };

  return (
    <div>
      {alertMessage !== null && (
        <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
      )}
      <Card className="register-card" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <h1>Consiglio</h1>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Register to post your own reviews!
          </Card.Subtitle>

          <form>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={user.username}
              onChange={handleChange}
              autoFocus
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={user.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmation"
              placeholder="Confirm Password"
              value={user.confirmation}
              onChange={handleChange}
            />
            <Button variant="primary" onClick={handleSubmit}>
              Register
            </Button>
          </form>

          <h6>Already have an account?</h6>
          <Card.Link href="/login">Log In Here</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;
