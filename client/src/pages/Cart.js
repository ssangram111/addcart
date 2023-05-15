import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Box } from "./Styled";
import { Cartcontext } from "../context/Contex";
import "./Cart.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export const Cart = () => {
  const [data, setdata] = useState([]);
  const [total, settotal] = useState(0);

  // const total = state.reduce((total, item) => {
  //   return Math.floor(total + item.price * item.quantity);
  // }, 0);

  const getcart = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/getcart");
      console.log(res.data.cart);
      setdata(res.data.cart);

      const cartData = res.data.cart;
      let total = 0;
      cartData.forEach((element) => {
        total = total + element.price * element.quantity;
      });
      settotal(total);
    } catch (error) {
      console.log(error, "during post data");
    }
  };
  const updatecart = async (id, quantity, calc) => {
    try {
      if (calc === "sum") {
        const res = await axios.put(
          `http://localhost:7000/api/update-cart/${id}`,
          {
            quantity: ++quantity,
          }
        );
        getcart();
      } else if (calc === "subtract") {
        const res = await axios.put(
          `http://localhost:7000/api/update-cart/${id}`,
          {
            quantity: --quantity,
          }
        );
        getcart();
      }
   
    } catch (error) {}
  };
  const handleremovecart = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/cart-delete/${id}`);
      const tempstate3 = data.filter((item) => item.u_id !== id);
      getcart();
      setdata(tempstate3);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getcart();
  }, []);

  return (
    <Layout>
      <Box>
        {data.length > 0 ? (
          <div className="cart">
            {data.map((item, index) => {
              return (
                <div
                  className="card p-2 d-flex flex-row justify-content-between"
                  key={index}
                >
                  <img src={item.image} className="m-3" alt="" />
                  <p>{item.title}</p>
                  <p className="m-5">
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                  <div className="quantity d-flex flex-row m-5">
                    {}
                    <Button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updatecart(item.u_id, item.quantity, "subtract");
                        } else {
                          handleremovecart(item.u_id);
                        }
                      }}
                    >
                      -
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      onClick={() =>
                        updatecart(item.u_id, item.quantity, "sum")
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleremovecart(item.u_id)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            {data.length > 0 && (
              <div className="total">
                <h2>Total: {total.toFixed(2)}</h2>
              </div>
            )}
          </div>
        ) : (
          <div className="container-fluid  mt-150">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Cart</h5>
                  </div>
                  <div className="card-body cart">
                    <div className="col-sm-12 empty-cart-cls text-center">
                      <img
                        src="https://i.imgur.com/dCdflKN.png"
                        width={130}
                        height={130}
                        className="img-fluid mb-4 mr-3"
                      />
                      <h3>
                        <strong>Your Cart is Empty</strong>
                      </h3>
                      <h4>Add something to make me happy :)</h4>

                      <Link to="/">continue shopping</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Layout>
  );
};
