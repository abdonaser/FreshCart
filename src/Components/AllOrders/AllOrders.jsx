import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const { userId, setUserId, setUserEmail } = useContext(cartContext);
  // const [orders, setOrders] = useState([]);

  const [orderLoading, setOrderLoading] = useState(false);
  // const [orders, setOrders] = useState([]);

  // async function getAllOrders() {
  //   try {
  //     setOrderLoading(true);
  //     const { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
  //     );
  //     console.log("getAllOrders ", data);
  //     setOrderLoading(false);
  //     setOrders(data);
  //   } catch (error) {
  //     console.log("getAllOrders Error ", error);
  //   }
  // }

  //   useEffect(() => {
  //     if (localStorage.getItem("token") !== null ){
  //     const x = jwtDecode(localStorage.getItem("token"));
  //     setUserId(x.id);
  // }
  // }, []);

  async function getAllOrders() {
    if (localStorage.getItem("token") !== null) {
      const x = jwtDecode(localStorage.getItem("token"));
      setUserId(x.id);
    }
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { data, isLoading, isError, refetch } = useQuery(
    "getAllOrders",
    getAllOrders,
    {
      cacheTime: 0,
      refetchInterval: 500,
      enabled: true,
    }
  );

  setUserEmail(data?.data[0].user.email);
  console.log(data?.data);
  // setOrders(data?.data)
  if (isLoading) {
    return (
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
    );
  }
  /*
  // console.log(isLoading);
  // console.log(orderLoading);

  // useEffect(() => {
  //   getAllOrders();
  // }, []);

  // if (orderLoading) {
  //   return (
  //     <>
  //       <div className="vh-100 d-flex justify-content-center align-items-center">
  //         <BallTriangle
  //           height={100}
  //           width={100}
  //           radius={5}
  //           color="#4fa94d"
  //           ariaLabel="ball-triangle-loading"
  //           wrapperClass={{}}
  //           wrapperStyle=""
  //           visible={true}
  //         />
  //       </div>
  //     </>
  //   );
  // }
  // if (orders.length == 0) {
  //   return (
  //     <>
  //       <div
  //         className="container   my-5 bg-light py-3    "
  //         style={{ height: "460px" }}
  //       >
  //         <div className="p-3 d-flex justify-content-between alert alert-info text-capitalize">
  //           <h3>there is no Orders</h3>
  //           <div>
  //             <Link to="/product">
  //               <button className="btn btn-info p-2 text-capitalize">
  //                 get Some Products
  //               </button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  */

  return (
    <>
      <Helmet>
        <title>All Orders </title>
      </Helmet>
      <div className="container py-2 pb-5 my-4 text-capitalize">
        <h1 className="mx-auto w-75 bg-light text-center py-2 my-2  ">
          your previous Orders
        </h1>

        {/* <p className="p-3 my-2 fw-bold text-bg-dark  text-center rounded-4 w-50 ">
          Email : {data?.data[0].user.email} , userId : {userId}
        </p> */}
        <h3 className="my-4 py-2 ">
          You Made{" "}
          <span className="main-bg-color rounded-3 p-2 mx-2">
            {" "}
            {data?.data.length}{" "}
          </span>{" "}
          orders
        </h3>
        {data?.data.map(function (order, idx) {
          return (
            <div
              key={idx}
              className="row p-0 m-0  my-4 pb-2 px-3  rounded-4 "
              style={{ backgroundColor: "#ece6e6" }}
            >
              <h2 className="text-center p-3 text-success">order cart</h2>
              <div className="col-md-5 align-items-center">
                <div className="orderTitle  ">
                  <div className=" ">
                    <h3 className="py-4 ">
                      order number :{" "}
                      <span className="main-color">
                        {data?.data.indexOf(order) + 1}
                      </span>
                    </h3>
                    <h3 className="pb-3 ">
                      payment Method Type :
                      <span className="main-color ps-1">
                        {" "}
                        {order.paymentMethodType}{" "}
                      </span>
                    </h3>
                    <h3 className="py-2 ">
                      Total Order Price :
                      <span className="main-color">
                        {order.totalOrderPrice} EGp
                      </span>
                    </h3>
                    <h3 className="py-2 ">
                      Order time :
                      <span className="main-color d-block ms-5 py-1">
                        {order.createdAt.split("T").splice(0, 1)}{" "}
                        <span className="text-black">at</span>{" "}
                        {order.createdAt.split("T").splice(1, 1)}
                      </span>
                    </h3>
                    <h3 className="py-2 ">
                      products purshased :{" "}
                      <span className="main-color">
                        {order.cartItems.length}
                      </span>
                    </h3>
                    <div className="   ">
                      <div className=" my-0 ">
                        <h3 className="py-2 m-0">Shipping Address :</h3>
                      </div>
                      <div className=" my-0 ps-5">
                        <div className="ms-5 py-2">
                          <h5 className="p-2">
                            <span className="fw-bold">Address</span> :{" "}
                            {order.shippingAddress?.details}
                          </h5>
                          <h5 className="p-2">
                            <span className="fw-bold">phone </span>:{" "}
                            {order.shippingAddress?.phone}{" "}
                          </h5>
                          <h5 className="p-2">
                            <span className="fw-bold">city</span> :{" "}
                            {order.shippingAddress?.city}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 p-0 m-0   ">
                <div className="parant-ordersDetails p-0 m-0  h-100 d-flex flex-column justify-content-between rounded-3 border border-1 border-black">
                  <div className="">
                    <h2 className="text-center p-2"> order details </h2>
                    <div className="orderDetails  ">
                      {order.cartItems.map(function (product, idx) {
                        return (
                          <div
                            key={idx}
                            className="row orderProducts py-2 mb-3 m-0 m-auto align-items-center border-1 border-light rounded-4 "
                            style={{ backgroundColor: "teal", width: "97%" }}
                          >
                            <div className="col-md-2">
                              <div className="imgOrder">
                                <img
                                  src={product.product.imageCover}
                                  className="w-100  rounded-3"
                                  alt={product.product.title}
                                />
                              </div>
                            </div>
                            <div className="col-md-10  ">
                              <div className="DetailsOfEachOrder  ">
                                <h4 className="py-2 pt-3">
                                  {product.product.title
                                    .split(" ")
                                    .splice(0, 5)
                                    .join(" ")}
                                </h4>
                                <div className="  py-2 d-flex justify-content-around align-items-center ">
                                  <h4>price : {product.price}</h4>
                                  <h4>count : {product.count}</h4>
                                  <h4>
                                    Total :{" "}
                                    <span className="main-bg-color rounded-3 p-2">
                                      {product.count * product.price}
                                    </span>{" "}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="totalCartPrice w-100 rounded-3 d-flex align-items-center justify-content-between p-3 ">
                    <h3 className="">Total Order Price :</h3>
                    <h3 className="  main-bg-color rounded-3 p-2 mx-2">
                      {order.totalOrderPrice} EGp
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
