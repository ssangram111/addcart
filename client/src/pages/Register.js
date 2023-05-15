import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button, Form } from "react-bootstrap";
import { Box } from "./Styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [answer, setanswer] = useState("");
  const [address, setaddress] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7000/api/register", {
        name,
        email,
        password,
        phone,
        answer,
        address,
      });

      if (res.data.success) {
        toast.success("User Register successfull", {
          autoClose: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <Box>
          <Form
            className="shadow-lg p-3 mt-3  rounded registerform"
            onSubmit={register}
          >
            <h1 className="shadow-sm text-white bg-light p-3 text-center rounded headingh1">
              Register here
            </h1>
            <Form.Group className="mb-3 ">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </Form.Group>
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
                type="text"
                placeholder="Enter your Phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="What is your favorite sports"
                value={answer}
                onChange={(e) => setanswer(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="type"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
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
            <Button type="submit">Register</Button>
          </Form>
        </Box>
      </Layout>
    </>
  );
}
