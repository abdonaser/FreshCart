import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
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
      <div>
        {/* <h2> Single Item</h2> */}
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%", height: "360px" }}
              src={require("../../images/slider-image-1.jpeg")}
              alt="slider-image-1"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "360px" }}
              src={require("../../images/slider-image-2.jpeg")}
              alt="slider-image-2"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "360px" }}
              src={require("../../images/slider-image-3.jpeg")}
              alt="slider-image-3"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "360px" }}
              src={require("../../images/slider-2.jpeg")}
              alt="slider-image-3"
            />
          </div>
        </Slider>
      </div>
    </>
  );
}
