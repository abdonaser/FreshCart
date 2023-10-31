import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  // const [isloading, setIsLoading] = useState(true);
  // const [allcategories, setAllcategories] = useState(null);
  // async function getCategoryProducct() {
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/categories"
  //   );
  //   console.log(data.data);
  //   setAllcategories(data.data);
  //   setIsLoading(false);
  // }
  // useEffect(() => {
  //   getCategoryProducct();
  // }, []);

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading, isError } = useQuery(
    "allCategory",
    getAllCategories,
    {
      cacheTime: 5000,
      refetchInterval: null,
    }
  );
  // console.log("category comp => ", data?.data.data._id);
  // console.log(data);
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <h1 className="mx-auto w-75  bg-light text-center py-2 my-3">
        Categories
      </h1>

      {isLoading == true ? (
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
        <div className="container pb-5 mb-5 my-2">
          <div className="row g-4">
            {data?.data.data.map(function (category, indx) {
              return (
                <div className="col-md-4" key={indx}>
                  <Link
                    to={`/categoryDetails/${category._id}`}
                    className="text-decoration-none"
                  >
                    <div className="category-cart  rounded-2  ">
                      <img
                        src={category.image}
                        alt="CatImg"
                        className="w-100 rounded-top-2 "
                        style={{ height: "360px" }}
                      />
                      <div className="w-100 p-0  ">
                        <h3 className="text-center border-category-title main-color p-2  ">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* {isloading ? (
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
        <div className="container my-2">
          <div className="row g-4">
            {allcategories.map(function (category, indx) {
              return (
                <div className="col-md-4">
                  <div className="category-cart  rounded-2" key={indx}>
                    <img
                      src={category.image}
                      alt="CatImg"
                      className="w-100 rounded-top-2 "
                       
                    />
                    <div className="w-100 p-0  ">
                      <h3 className="text-center border-category-title main-color p-2  ">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
    </>
  );
}
