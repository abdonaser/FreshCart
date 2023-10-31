import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import freshcartLogo from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/counter";
import { Bars } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";

export default function Nav() {
  // const [isLoading, setisLoading] = useState(false);
  const { token, setToken } = useContext(authContext);

  const { numOfCartItems } = useContext(cartContext);

  const navigateLogOut = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigateLogOut("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img className="w-100" src={freshcartLogo} alt="freshcart-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <p></p>
            {token ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/wishlist">
                      Wish List
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/Tagroba">
                    Tagroba
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/allorders">
                      All Orders
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {token ? (
                <>
                  <li className="nav-item mx-3 p-2">
                    <Link className="nav-link position-relative" to="/cart">
                      <i className="fa-solid fa-cart-shopping main-color fa-lg "></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item me-3">
                    <Link className="nav-link " to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <i className="fa-brands me-2 fa-facebook-f "></i>
                    <i className="fa-brands me-2 fa-twitter "></i>
                    <i className="fa-brands me-2 fa-whatsapp "></i>
                    <i className="fa-brands me-2 fa-linkedin "></i>
                  </li>
                </>
              ) : (
                ""
              )}
              {/* <li className="nav-item mx-3 p-2">
                <Link className="nav-link position-relative" to="/cart">
                  <i
                    className="fa-solid fa-cart-shopping main-color fa-lg "
                    // style={{ fontSize: "20px" }}
                  ></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link " to="/profile">
                  Profile
                </Link>
              </li> */}

              {token ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={logOut}
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                    >
                      logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
