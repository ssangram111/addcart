import React from "react";
import Header from "./Header.js";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "90vh" }}>{children}</main>
    </>
  );
}
