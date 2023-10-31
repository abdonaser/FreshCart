import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function BrandsDetails() {
  const { id } = useParams();
  function getBrandsDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
  const { data, isLoading } = useQuery("BrandsDetails", getBrandsDetails);

  return (
    <>
      <Helmet>
        <title>{data?.data.data.name}</title>
      </Helmet>
      {isLoading ? (
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
        <div className="container py-5 my-5">
          <div className="row   justify-content-around align-items-center">
            <div className="col-md-4 category-cart   p-0">
              <div className="category-img">
                <img
                  src={data.data.data.image}
                  alt={data.data.data.name}
                  className="w-100 "
                />
              </div>
            </div>
            <div className="col-md-8 d-flex  justify-content-center  ">
              <div>
                <h2 className="mb-5 py-2 h2-size">
                  Brand Name :
                  <span className="main-color">{data.data.data.name}</span>
                </h2>
                <div className="category-datails fw-bold  ">
                  <p className="my-2 p-2 p-size text-muted">
                    slug : {data.data.data.slug}{" "}
                  </p>
                  <p className="my-2 p-2 p-size text-muted">
                    createdAt : {data.data.data.createdAt}{" "}
                  </p>
                  <p className="my-2 p-2 p-size text-muted">
                    updatedAt : {data.data.data.updatedAt}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
