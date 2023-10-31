import axios from "axios";
import React, { useContext, useState } from "react";
import { BallTriangle, ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  //token => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzZmN2I3ODQ5OGJlMWNkMGJmMzBmMiIsIm5hbWUiOiJBYmRlbHJhaG1hbiBOYXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4MTAxMTk3LCJleHAiOjE3MDU4NzcxOTd9.O_rFjy-B9XGJRgjl8-aVigrBPjJeoqqI2Imwn70bAns

  // const [isLoading, setIsLoading] = useState(true);
  // setIsLoading(true);

  // const {numOfCartItems, totalCartPrice } = useContext(cartContext);

  // console.log("products =>", products);

  // function getCartData() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
  //     headers: { token: localStorage.getItem("token") },
  //   });
  // }
  // const { data, isLoading } = useQuery("getCartData", getCartData);
  // if (isLoading) {
  //   return (
  //     <div className="vh-100 d-flex justify-content-center align-items-center">
  //       <BallTriangle
  //         height={100}
  //         width={100}
  //         radius={5}
  //         color="#4fa94d"
  //         ariaLabel="ball-triangle-loading"
  //         wrapperClass={{}}
  //         wrapperStyle=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }

  const {
    cartProducts,
    totalCartPrice,
    numOfCartItems,
    getCartLoading,
    deleteProduct,
    updateQuantity,
    removeCart,
  } = useContext(cartContext);
  // npm i jwt-decode
  async function deleteAnProduct(id) {
    const res = await deleteProduct(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("product Deleted Successfully");
    } else {
      toast.error("Problem Eccured");
    }
  }
  const [incbtnLoading, setIncbtnLoading] = useState(false);
  async function incrementCount(id, count) {
    setIncbtnLoading(true);
    const oldCount = count;
    const newOCunt = oldCount + 1;
    const res = await updateQuantity(id, newOCunt);

    console.log(count);
    setIncbtnLoading(false);
  }
  const [dncbtnLoading, setDncbtnLoading] = useState(false);
  async function decrementCount(id, count) {
    setDncbtnLoading(true);
    const oldCount = count;
    const newOCunt = oldCount - 1;
    if (newOCunt >= 1) {
      const res = await updateQuantity(id, newOCunt);
      setDncbtnLoading(false);
    } else {
      deleteAnProduct(id);
      // toast.error("it is not a logic ya papa");
      setDncbtnLoading(false);
    }

    console.log(count);
  }
  if (cartProducts == null || cartProducts.length == 0) {
    return (
      <>
        <Helmet>
          <title>Cart </title>
        </Helmet>
        <div
          className="container   my-5 bg-light py-3    "
          style={{ height: "460px" }}
        >
          <div className="p-3 d-flex justify-content-between alert alert-info text-capitalize">
            <h3>there is no products</h3>
            <div>
              <Link to="/product">
                <button className="btn btn-info p-2 text-capitalize">
                  get Some Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  // else if (cartProducts.length == 0) {
  //   return (
  //     <>
  //       <div className="container my-5 bg-light py-2 text-capitalize d-flex justify-content-between align-items-center">
  //         <h3>there is no products</h3>
  //         <div>
  //           <Link to="/product">
  //             <button className="btn btn-info p-2">get Some Products</button>
  //           </Link>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  
  return (
    <>

      <Helmet>
        <title>Cart </title>
      </Helmet>

      {getCartLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container my-5 bg-light py-2 text-capitalize">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="p-2">Shop Cart</h1>
            <div
              className=""
              //  style={{ width: "200px" }}
            >
              <Link to="/payment">
                <button
                  // onClick={removeCart}
                  className="btn btn-primary w-100 px-3 py-2  "
                  style={{ fontSize: "20px" }}
                >
                  Check Out
                </button>
              </Link>
            </div>
          </div>
          {numOfCartItems == 0 ? (
            <h3 className="text-center text-black my-4 alert alert-danger">
              your cart is empty
            </h3>
          ) : (
            <div className="d-flex justify-content-between px-4">
              <h4 className=" mb-0 p-2 ">
                total Cart Price :
                <span className="fw-bolder main-color mx-2">
                  {totalCartPrice}
                </span>
              </h4>
              <h4 className="mb-3 p-2 ">
                num Of Cart Items :
                <span className="fw-bolder main-color mx-2">
                  {numOfCartItems}
                </span>
              </h4>
            </div>
          )}

          {cartProducts.map(function (product, indx) {
            return (
              <>
                <div
                  className="row my-2    align-items-center  "
                  style={{ backgroundColor: "#eee" }}
                  key={indx}
                >
                  <div className="col-sm-2  ">
                    <div className="productImg">
                      <img
                        src={product.product.imageCover}
                        alt=""
                        className="w-100"
                        // style={{ height: "200px" }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-8 py-3     ">
                    <div className="productDetails">
                      <h3>{product.product.title}</h3>
                      <p>price : {product.price}</p>
                    </div>
                    <button
                      onClick={() => deleteAnProduct(product.product.id)}
                      className="btn btn-outline-danger "
                    >
                      Remove
                    </button>
                  </div>
                  <div className="col-sm-2   ">
                    <div className="productDetails d-flex align-items-center justify-content-end ms-0  ">
                      <button
                        onClick={() =>
                          incrementCount(product.product.id, product.count)
                        }
                        className="btn btn-outline-success"
                      >
                        {incbtnLoading ? (
                          <div className="ringStyleIncBtn">
                            <ColorRing
                              className="ringStyleIncBtn"
                              visible={true}
                              height="20"
                              width="25"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                              ]}
                            />
                          </div>
                        ) : (
                          "+"
                        )}
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          decrementCount(product.product.id, product.count)
                        }
                        className="btn btn-outline-success"
                      >
                        {dncbtnLoading ? (
                          <div className="ringStyleIncBtn">
                            <ColorRing
                              className="ringStyleIncBtn"
                              visible={true}
                              height="20"
                              width="30"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                              ]}
                            />
                          </div>
                        ) : (
                          "-"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mx-auto w-75 border-3 border-bottom border-info  "></div>
              </>
            );
          })}
          <div className="my-4 text-center">
            <div className="  " style={{}}>
              <button
                onClick={removeCart}
                className="btn btn-outline-success px-5 py-2 "
                style={{ fontSize: "21px" }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
