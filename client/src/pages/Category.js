import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import "./Category.css";
import { Box } from "./Styled";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { Cartcontext } from "../context/Contex";
import Form from "react-bootstrap/Form";
import cors from "cors";
const Category = () => {
  const [data, setdata] = useState([]);
  const [cartdata, setcartdata] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [cat, setcat] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [isInCart, setIsInCart] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${cat}`
    );
    setdata(response.data);
  };
  useEffect(() => {
    fetchData();
    getcart();
  }, [cat]);

  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;

  const handleSubmit = async (id, image, title, price) => {
    setLoading(true);
    console.log(id, "id added in mongodb");
    try {
      const res = await axios.post("http://localhost:7000/api/add-to-cart", {
        u_id: id,
        quantity: 1,
        image: image,
        title: title,
        price: price,
      });
      if (res.status === 201) {
        setLoading(false);
        getcart();
      }
    } catch (error) {
      console.log(error, "during post data");
    }
  };
  const handleremovecart = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:7000/api/cart-delete/${id}`);
      console.log("Item removed successfully");
      if (res.status === 200) {
        getcart();
      }

    } catch (error) {
      console.error(error);
    }
  };

  const getcart = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/getcart");
      console.log(res.data.cart);
      setcartdata(res.data.cart);
    } catch (error) {
      console.log(error, "during post data");
    }
  };

  return (
    <Layout>
      <Box>
        <Form className="mt-5">
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                defaultChecked
                label="All Products"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                onClick={() => setcat("")}
              />
              <Form.Check
                inline
                label="electronics"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                onClick={() => setcat("category/electronics")}
              />

              <Form.Check
                inline
                label="jewelery"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                onClick={() => setcat("category/jewelery")}
              />
              <Form.Check
                inline
                label="men's clothing"
                name="group1"
                type={type}
                id={`inline-${type}-3`}
                onClick={() => setcat("category/men's clothing")}
              />
              <Form.Check
                inline
                label="women's clothing"
                name="group1"
                type={type}
                id={`inline-${type}-3`}
                onChange={() => setcat("category/women's clothing")}
              />
            </div>
          ))}
        </Form>
        <div className="home">
          {data.map((item, index) => {
            item.quantity = 1;
            let found = cartdata.find((i) => item.id === i.u_id);
            console.log(found, "found id ");
            return (
              <div className="d-flex flex-row" key={index}>
                <Card style={{ width: "18rem", padding: 5 }}>
                  <Card.Img
                    variant="top"
                    height={250}
                    width={50}
                    src={item.image}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Rs.{item.price}</ListGroup.Item>

                    {!found ? (
                      <Button
                        variant="dark"
                        onClick={() => {
                          handleSubmit(
                            item.id,
                            item.image,
                            item.title,
                            item.price
                          );

                          dispatch({ type: "ADD", payload: item });
                        }}
                      >
                        add to cart
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          handleremovecart(item.id);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </ListGroup>
                </Card>
              </div>
            );
          })}
        </div>
      </Box>
    </Layout>
  );
};

export default Category;
