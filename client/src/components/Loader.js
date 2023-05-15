import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Loader({path = "login"}) {
  const [count, setcount] = useState(3);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prevValue) => --prevValue);
    }, 1000);

    count === 0 &&
      navigate('/Login');
    return () => clearInterval(interval);
  }, [count, navigate,path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2 className="mt-2">Redirecting to you in {count} second</h2>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
export default Loader;
