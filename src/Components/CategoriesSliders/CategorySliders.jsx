import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
export default function CategorySliders() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplayspeed: 1000,
  };
  function getAllCategorySliders() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery(
    "categoriesSliders",
    getAllCategorySliders,
    {
      cacheTime: 5000,
      refetchInterval: 3000,
    }
  );
  console.log(data?.data.data);

  return (
    <>
      {isLoading ? (
        <div>
          <div className="w-100 d-flex justify-content-center align-items-center">
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
        </div>
      ) : (
        <div className="">
          <Slider {...settings}>
            {data.data.data.map(function (category, idx) {
              return (
                <div className="col-2 col-md-4">
                  <div key={idx} className="category-slider py-4">
                    <img
                      className="categorySliderImg"
                      style={{ width: "100%", height: "200px" }}
                      src={category.image}
                      alt={category.name}
                    />
                    <h6 className="text-center p-2  categorySliderName">
                      {category.name}
                    </h6>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
}
