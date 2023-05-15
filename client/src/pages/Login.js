import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { UseAuth } from "../context/AuthProvider";
import { Box } from "./Styled";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setauth] = UseAuth();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7000/api/login", {
        email: email,
        password: password,
      });

      if (res.data.success) {
        toast.success("User Login successfull", {
          autoClose: 2000,
        });
        setauth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        console.log(auth, "ye rha data");
      } else {
        toast.error("Something went wrong");
        alert("Invalid Credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box>
        <Form
          onSubmit={login}
          className="shadow-lg p-3 mt-5 rounded registerform"
        >
          <h1 className="shadow-sm text-primary p-3 text-center rounded headingh1">
            Login here
          </h1>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex flex-column">
            <Button type="submit">Login</Button>
          </div>
        </Form>
      </Box>
    </Layout>
  );
}
