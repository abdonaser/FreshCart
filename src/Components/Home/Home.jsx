import React from "react";
import Product from "../Product/Product";
import CategorySliders from "../CategoriesSliders/CategorySliders";
import HomeSlider from "../HomeSlider/HomeSlider";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplayspeed: 1000,
  };
  return (
    <>
      
      {/* <h1 className="mx-auto w-75 bg-light text-center py-2 my-3">Home</h1> */}
      {/* Main Slider */}
      <div className="container mt-3 mb-5 ">
        <div className="row gx-0">
          <div className="col-md-9">
            <HomeSlider />
          </div>
          <div className="col-md-3">
            <img
              style={{ width: "100%", height: "180px" }}
              className=""
              src={require("../../images/slideside1.jpg")}
              alt="slideside1"
            />
            <img
              style={{ width: "100%", height: "180px" }}
              className=""
              src={require("../../images/slideside2.jpg")}
              alt="slideside2"
            />
          </div>
        </div>
      </div>

      {/* categories Slider */}
      <div className="container py-1 mb-2">
        <h3 className="my-4 ">Shop Popular Categories</h3>

        <div className="row mb-5 py-4 ">
          <CategorySliders />
        </div>
      </div>

      {/* Products */}
      <Product />
      <Helmet>
        <title>Home</title>
      </Helmet>
    </>
  );
}
