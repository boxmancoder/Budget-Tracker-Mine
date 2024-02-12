import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/login.css";
import logo from "../../img/BudgetAppLogo6.png";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  const { actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      console.log("Token:", token);
      const result = await actions.resetPassword(token, password);
      if (result) {
        toast.success("Password updated successfully");
        navigate("/login");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      toast.error("An error occurred while trying to reset the password");
    }
  };

  return (
    <Container className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="box w-100 justify-content-between align-items-center">
        <Col md={6} className="text-center text-light">
          <img src={logo} width={450} alt="Logo" className="fade-in-logo" />

          <div style={{ marginTop: "30px" }}>
            <hr style={{ width: "440px", margin: "auto", marginBottom: "20px" }} />
            <h2 className="fade-in-text">Smart budgeting made simple</h2>
          </div>
        </Col>
        <Col md={6}>
          <div className="login-box" style={{ maxWidth: "380px", margin: "auto" }}>
            <h1 className="mb-4 text-center">Reset Password</h1>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="me-2 mb-4 w-100" variant="primary" type="submit" onClick={handleSubmit}>
              Reset Password
            </Button>
            <p>
              Remembered your password?
              <a href="/login" className="link-info link-register"> Login</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;