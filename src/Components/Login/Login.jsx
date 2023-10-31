import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/counter";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [loginCorrect, setloginCorrect] = useState(null);
  const [loginFalse, setloginFalse] = useState(null);
  const { setToken } = useContext(authContext);

  const useLogin = {
    email: "",
    password: "",
  };

  async function loginUser(values) {
    setisLoading(true);
    setloginCorrect(null);
    setloginFalse(null);

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      const { message, token } = data;
      localStorage.setItem("token", token);
      setToken(token)
      setloginCorrect(message + " Welcome Back");
      setTimeout(() => {
        navigate("/home");
      }, 1500);

      // const getToken = localStorage.getItem("token");
      console.log("from login =>",data);
      // console.log("correct =>", message);
    } catch (error) {
      const { message } = error.response.data.message;
      console.log("error =>", message);
      setloginFalse(
        error.response.data.message +
          " " +
          "=> you will navigatetd you to create anew Account "
      );
      setTimeout(() => {
        navigate("/register");
      }, 2500);
    }
    // console.log(values);
    setisLoading(false);
  }
  
  const loginFormik = useFormik({
    initialValues: useLogin,
    onSubmit: loginUser,
    validate: function (values) {
      const errors = {};
      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "email is not valid";
        // console.log("your email is not valid")
      }
      if (values.password.length < 4 || values.password.length > 10) {
        errors.password = "your password is not valied";
        // console.log(errors.password)
      }
      return errors;
    },
  });
  return (
    <>
      <div className="w-75 mx-auto my-3 py-4">
        <h1>Login</h1>
        <form onSubmit={loginFormik.handleSubmit}>
          <label className="mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="form-control mb-3"
            id="email"
            name="email"
            type="email"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
          {loginFormik.errors.email && loginFormik.touched.email ? (
            <p className="alert alert-danger">{loginFormik.errors.password}</p>
          ) : (
            ""
          )}

          {/* Password */}

          <label className="mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="form-control mb-3"
            id="password"
            name="password"
            type="password"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
          {loginFormik.errors.password && loginFormik.touched.password ? (
            <p className="alert alert-danger">{loginFormik.errors.password}</p>
          ) : (
            ""
          )}

          <button
            className="btn btn-success "
            type="submit"
            disabled={
              loginFormik.dirty == false || loginFormik.isValid == false
            }
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
              "Login"
            )}
          </button>
        </form>
        <div className="mx-auto p-4 ">
          {loginCorrect ? (
            <p className="alert alert-info">{loginCorrect} </p>
          ) : (
            ""
          )}
          {loginFalse ? <p className="alert alert-danger">{loginFalse}</p> : ""}
        </div>
      </div>
    </>
  );
}
