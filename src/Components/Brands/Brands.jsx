import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Brands() {
  // const [isloading, setIsLoading] = useState(true);
  // const [allBrands, setAllBrands] = useState(null);
  // async function getBrands() {
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/brands"
  //   );
  //   console.log(data.data);
  //   setAllBrands(data.data);
  //   setIsLoading(false);
  // }
  // useEffect(() => {
  //   getBrands();
  // }, []);

  function GetAllBbrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    // console.log(data.data.data);
  }

  const { data, isLoading } = useQuery("allBrands", GetAllBbrands, {
    cacheTime: 5000,
    refetchInterval: 3000,
    enabled: true,
  });

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className="mx-auto w-75 bg-light text-center py-2 my-3">
        All Brands
      </h1>

      {isLoading ? (
        <div className="vh-100 pb-5 mb-5  d-flex justify-content-center align-items-center">
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
        <div className="container my-2 pb-5  mb-5">
          <div className="row g-4">
            {data?.data.data.map(function (brand, indx) {
              return (
                <div className="col-md-3">
                  <Link
                    to={`/brandsDetails/${brand._id}`}
                    className="text-decoration-none"
                  >
                    <div className="brand-cart  rounded-2 p-3" key={indx}>
                      <img
                        src={brand.image}
                        alt="BrandImg"
                        className="w-100 rounded-top-2 "
                      />
                      <div className="w-100 p-0  ">
                        <h5 className="text-center border-category-title main-color p-2 ">
                          {brand.name}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
