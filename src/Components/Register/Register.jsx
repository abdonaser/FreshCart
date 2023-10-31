import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [Errmsg, setErrmsg] = useState(null);
  const [SeccessMsg, setSeccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  // async function registerNewUser(values) {
  //   // const { data } = await axios
  //   //   .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
  //   //   .catch(function (error) {
  //   //     // مش هيدخل في الاسكوب ده الا لو في ريتيرن غلط
  //   //     console.log(error.response.data.message);
  //   //   });
  //   //   // مش هسنفز اللوج ده الا لو عدا من جزئ الكاتش
  //   // console.log(data);
  // }
  async function registerNewUser(values) {
    setErrmsg(null);
    setSeccessMsg(null);
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message == "success") {
        setSeccessMsg("Success Registration  Welcome To Oure WebSite");
        setTimeout(function () {
          navigate("/login");
        }, 3500);
      }
      // لو مقيش ايرور هينفز الكود ده
      console.log("True Setuation => ", data.message);
      console.log("register data => ", data);
    } catch (error) {
      // لو فية ايرور هينفز الكود ده
      console.log("Error Setuation => ", error.response.data.message);
      setErrmsg("Error Setuation => " + error.response.data.message);
      setTimeout(function () {
        navigate("/login");
      }, 3500);
    }
    setIsLoading(false);
  }
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: registerNewUser,
    validate: function (values) {
      const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
      const errors = {};
      if (values.name.length < 4 || values.name.length > 17) {
        errors.name = "your name Must be from 4 to 12 Chracters";
      }
      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "email is not valid";
        // console.log("your email is not valid")
      }
      if (!values.phone.match(phoneRegex)) {
        errors.phone = "your phone is not valid";
        // console.log("your Phone is not valid")
      }
      if (values.password.length < 4 || values.password.length > 10) {
        errors.password = "your password is not valied";
        // console.log(errors.password)
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "your rePassword and your password not matched";
        // console.log(errors.rePassword)
      }
      return errors;
    },
  });
  return (
    <>
      {/* <div className="container"> */}
      <div className="w-75 m-auto my-3 py-4">
        <h1>Register</h1>
        <form onSubmit={formikObj.handleSubmit}>
          {/* Name */}
          <label htmlFor="name" className="mb-1">
            Name :
          </label>
          <input
            className="form-control mb-3"
            id="name"
            type="text"
            placeholder="Enter Your Name"
            value={formikObj.values.name}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
          />

          {formikObj.errors.name && formikObj.touched.name ? (
            <div className="alert alert-danger ">{formikObj.errors.name}</div>
          ) : (
            ""
          )}

          {/* Email */}
          <label htmlFor="email" className="mb-1">
            Email :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.email}
            className="form-control mb-3"
            id="email"
            type="email"
            placeholder="Enter Your Email"
          />
          {formikObj.errors.email && formikObj.touched.email ? (
            <div className="alert alert-danger ">{formikObj.errors.email}</div>
          ) : (
            ""
          )}

          {/* Phone */}
          <label htmlFor="phone" className="mb-1">
            Phone :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.phone}
            className="form-control mb-3"
            id="phone"
            type="tel"
            placeholder="Enter Your Phone"
          />
          {formikObj.errors.phone && formikObj.touched.phone ? (
            <div className="alert alert-danger ">{formikObj.errors.phone}</div>
          ) : (
            ""
          )}
          {/* password */}
          <label htmlFor="password" className="mb-1">
            Password :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.password}
            className="form-control mb-3"
            id="password"
            type="password"
            placeholder="Enter Your Password"
          />
          {formikObj.errors.password && formikObj.touched.password ? (
            <div className="alert alert-danger ">
              {formikObj.errors.password}
            </div>
          ) : (
            ""
          )}
          {/* rePassword */}
          <label htmlFor="rePassword" className="mb-1">
            Repasseord :
          </label>
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.rePassword}
            className="form-control mb-3"
            id="rePassword"
            type="password"
            placeholder="Enter Your Repasseord"
          />
          {formikObj.errors.rePassword && formikObj.touched.rePassword ? (
            <div className="alert alert-danger ">
              {formikObj.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {/* Register Btn */}
          <div className="  d-flex justify-content-start">
            <button
              className="btn btn-success "
              type="submit"
              disabled={formikObj.dirty === false || formikObj.isValid === false}
            >
              {isLoading ? (
                <Bars
                  height="30"
                  width="60"
                  color="#fff"
                  // color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <div className="mx-auto p-4 ">
          {SeccessMsg ? <p className="alert alert-info">{SeccessMsg} </p> : ""}
          {Errmsg ? <p className="alert alert-danger">{Errmsg}</p> : ""}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
