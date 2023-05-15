import React from "react";
import { Routes, Route } from "react-router-dom";
import { Cart } from "../pages/Cart";
import Category from "../pages/Category";
import Login from "../pages/Login";
import Private from "../components/layout/Routes/Private";
import Register from "../pages/Register";
export default function Navigator() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="" element={<Category />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}
