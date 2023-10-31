import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { useQuery } from "react-query";

export default function Profile() {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setuserId] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  useEffect(() => {
    setUserInfoLoading(true);
    const x = jwtDecode(localStorage.getItem("token"));
    setUserName(x.name);
    setUserRole(x.role);
    setuserId(x.id);
    console.log(x);
    setUserInfoLoading(false);
  }, []);

  return (
    <>
      {userInfoLoading ? (
        <div className="vh-100 pb-5 mb-5 d-flex justify-content-center align-items-center">
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
        <div className="profil pb-5 mb-5 container vh-100 my-4 py-3  text-capitalize bg-light">
          <table>
            <tr>
              <td className="head">user Id</td>
              <td> : </td>
              <td className="value">{userId}</td>
            </tr>
            <tr>
              <td className="head">user role </td>
              <td> : </td>
              <td className="value">{userRole}</td>
            </tr>
            <tr>
              <td className="head">user name</td>
              <td> : </td>
              <td className="value">{userName}</td>
            </tr>
          </table>
          {/* <h3 className="mb-3 p-2 ">user Id </h3>
          <h3 className="mb-3 p-2 ">{userName} </h3>
          <h3 className="mb-3 p-2 ">user role : {userRole} </h3> */}
        </div>
      )}
    </>
  );
}
