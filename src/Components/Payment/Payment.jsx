import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { date } from "yup";
import toast from "react-hot-toast";

export default function Payment() {
  const { cartId, getUserCart, removeCart } = useContext(cartContext);

  const [userdetails, setuserdetails] = useState({});

  // async function cashPayment() {
  //   try {
  //     const shippingDetails = {
  //       shippingAddress: {
  //         details: userdetails.details,
  //         phone: userdetails.phone,
  //         city: userdetails.city,
  //       },
  //     };
  //     console.log("values ", userdetails);
  //     console.log(shippingDetails);
  //     console.log("cart id  =>", cartId);

  //     const { data } = await axios.post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  //       shippingDetails,
  //       {
  //         headers: { token: localStorage.getItem("token") },
  //       }
  //     );
  //     removeCart();
  //     console.log(data);
  //     toast.success("your cart added to order page successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function cashPayment(values) {
  //   const userDetails = {
  //     shippingAddress: {
  //       details: values.details,
  //       phone: values.phone,
  //       city: values.city,
  //     },
  //   };

  //   console.log("cart id  =>", cartId);
  //   try {
  //     const { data } = await axios.post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  //       userDetails,
  //       {
  //         headers: { token: localStorage.getItem("token") },
  //       }
  //     );
  //     removeCart();
  //     console.log(data);
  //     toast.success("your cart added to order page successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function cashPayment(values) {
    console.log("user details state => ", userdetails);
    console.log("props", values);
    const shippingDetails = {
      shippingAddress: values,
    };
    console.log("shippingDetails", shippingDetails);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingDetails,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      // removeCart();
      // console.log(data);
      toast.success("your cart added to order Your page successfully");
    } catch (error) {
      console.log("cash payment error", error);
      toast.error("your cart doesnt added to Your order page ");
    }
  }

  async function onlinePayment(values) {
    const shippingDetails = {
      shippingAddress: values,
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        shippingDetails,
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: "http://localhost:3000" },
        }
      );
      console.log(data.session.url);
      window.open(data.session.url, "_self");
      // removeCart();

      toast.success("you will navigated to online payment page");
    } catch (error) {
      console.log("Online payment error => ", error.response.data.message);
      toast.error(`${error.response.data.message}`);
    }
  }

  const paymentDetails = {
    details: "",
    phone: "",
    city: "",
  };

  const paymentFormik = useFormik({
    initialValues: paymentDetails,
    onSubmit: (values) => {
      setuserdetails(values);
    },
    validate: function (values) {
      const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
      const errors = {};
      if (values.details.length < 4) {
        errors.details = "your detials is requird";
      }

      if (!values.phone.match(phoneRegex)) {
        errors.phone = "your phone is not valid";
      }
      if (values.city.length < 4) {
        errors.city = "is required";
      }
      return errors;
    },
  });
  return (
    <>
      <div className="container bg-light my-5">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={paymentFormik.handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="details"
                  className="mb-2 py-2 text-capitalize "
                  style={{ fontSize: "20px" }}
                >
                  details
                </label>
                <input
                  className="form-control py-2"
                  id="details"
                  name="details"
                  type="text"
                  value={paymentFormik.values.details}
                  onChange={paymentFormik.handleChange}
                  onBlur={paymentFormik.handleBlur}
                />
                {paymentFormik.errors.details && paymentFormik.touched ? (
                  <div className="alert alert-danger ">
                    {paymentFormik.errors.details}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className="mb-2 py-2 text-capitalize "
                  style={{ fontSize: "20px" }}
                >
                  phone{" "}
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control py-2"
                  value={paymentFormik.values.phone}
                  onChange={paymentFormik.handleChange}
                  onBlur={paymentFormik.handleBlur}
                />
                {paymentFormik.errors.phone && paymentFormik.touched.phone ? (
                  <div className="alert alert-danger ">
                    {paymentFormik.errors.phone}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="city"
                  className="mb-2 py-2 text-capitalize "
                  style={{ fontSize: "20px" }}
                >
                  city
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control py-2"
                  value={paymentFormik.values.city}
                  onChange={paymentFormik.handleChange}
                  onBlur={paymentFormik.handleBlur}
                />
                {paymentFormik.errors.city && paymentFormik.touched.city ? (
                  <div className="alert alert-danger ">
                    {paymentFormik.errors.city}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center p-2 m-2">
                <button
                  onClick={() => cashPayment(paymentFormik.values)}
                  type="btn"
                  className="btn btn-outline-primary text-capitalize w-25 mx-2"
                >
                  Cash payment
                </button>
                <button
                  onClick={() => onlinePayment(paymentFormik.values)}
                  type="btn"
                  className="btn btn-outline-success text-capitalize w-25 mx-2"
                >
                  online Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
