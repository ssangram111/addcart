import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { Box } from "./Styled";
import { Cartcontext } from "../context/Contex";
import "./Cart.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  console.log(state, "state print");
  const total = state.reduce((total, item) => {
    return Math.floor(total + item.price * item.quantity);
  }, 0);

  const handleSubmit = async (item) => {

    console.log(item,"item added in mongodb")
    try {
      const res = await axios.post("http://localhost:7000/api/add-to-cart", {
        category: item.category,
        description: item.description,
        u_id: item.id,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        title: item.title,
      });
    } catch (error) {
      console.log(error,"during post data");
    }
  };
  return (
    <Layout>
      <Box>
        {state.length > 0 ? (
          <div className="cart">
            {state.map((item, index) => {
              return (
                <div
                  className="card p-2 d-flex flex-row justify-content-between"
                  key={index}
                >
                  <img src={item.image} className="m-3" alt="" />
                  <p>{item.title}</p>
                  <p className="m-5">{item.quantity * item.price}</p>
                  <div className="quantity d-flex flex-row m-5">
                    <Button
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch({ type: "DECREASE", payload: item });
                        } else {
                          dispatch({ type: "REMOVE", payload: item });
                        }
                      }}
                    >
                      -
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      onClick={() =>
                        dispatch({ type: "INCREASE", payload: item })
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="btn btn-danger"
                    onClick={() => dispatch({ type: "REMOVE", payload: item })}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            {state.length > 0 && (
              <div className="total">
                <h2>Total: {total}</h2>
              </div>
            )}
            <div>
              <Button onSubmit={handleSubmit}>Place order</Button>
            </div>
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
