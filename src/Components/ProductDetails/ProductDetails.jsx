import axios from "axios";
import React, { useContext, useState } from "react";
import { BallTriangle, ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { id } = useParams();
  // console.log(" id =>" + id);
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery("productDetails", getProductDetails);
  // console.log(data?.data.data.images);
  /*
  // if (isLoading) {
  //   return (
  //     <div className="vh-100 d-flex justify-content-center align-items-center">
  //       <BallTriangle
  //         height={100}
  //         width={100}
  //         radius={5}
  //         color="#4fa94d"
  //         ariaLabel="ball-triangle-loading"
  //         wrapperClass={{}}
  //         wrapperStyle=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }
  */

  //  console.log(data.data.data.id)

  const { addProductToCart, wishListLoading, wishlistData } =
    useContext(cartContext);

  const [sendingLoading, setSendingLoading] = useState(false);

  async function addProduct(id) {
    setSendingLoading(true);
    const res = await addProductToCart(id);
    if (res.status == "success") {
      console.log("From ProductDetails Comp =>", res);
      toast.success(res.message, { position: "top-center", duration: 2000 });
    } else {
      toast.error("Error Happend", { position: "top-center", duration: 2000 });
    }
    setSendingLoading(false);
  }

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

  async function addToWishList(id) {
    const productId = {
      productId: id,
    };
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        productId,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(data.message);
      toast.success(data.message);
    } catch (error) {
      console.log("addToWishList Error", error);
      // toast.error(data?.message);
    }
  }
  async function deletFromWishList(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(data);
      toast.success(data?.message);
    } catch (error) {
      console.log("addToWishList Error", error);
      // toast.error(data?.message);
    }
  }

  async function handelClick(productId) {
    wishlistData.data.data.find((el) => el.id === productId)
      ? deletFromWishList(productId)
      : addToWishList(productId);
  }
  return (
    <>
      <Helmet>
        <title>{data?.data.data.title.split(" ").splice(0, 2).join(" ")}</title>
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
        <div className="container py-5 vh-100">
          <div className="row align-items-center">
            <div className="col-md-3  ">
              <figure className="category-cart">
                <div>
                  <Slider {...settings}>
                    {data.data.data.images.map(function (img, idx) {
                      return (
                        <div key={idx}>
                          <img
                            src={img}
                            alt={data.data.data.title}
                            className="w-100"
                          />
                        </div>
                      );
                    })}

                    {/* <div>
                      <img
                        src={data.data.data.imageCover}
                        alt={data.data.data.title}
                        className="w-100"
                      />
                    </div>
                    <div>
                      <img
                        src={data.data.data.imageCover}
                        alt={data.data.data.title}
                        className="w-100"
                      />
                    </div>
                    <div>
                      <img
                        src={data.data.data.imageCover}
                        alt={data.data.data.title}
                        className="w-100"
                      />
                    </div> */}
                  </Slider>
                </div>
              </figure>
            </div>
            <div className="col-md-9   position-relative ">
               
                <div className="details ">
                  <h1 className="mb-2">{data.data.data.title}</h1>
                  <p className="my-4 text-muted">
                    {data.data.data.description}
                  </p>
                  <h5 className="fw-bold my-5 ">
                    price : {data.data.data.price} EGp
                  </h5>
                </div>
                <div className="btns  d-flex justify-content-start gx-5 align-items-center ">
                  <div className="addToCart mx-4 w-25">
                    <button
                      onClick={() => addProduct(data?.data.data.id)}
                      className="btn btn-success rounded-3 p-3 my-2 main-bg-color border-0 fw-bold text-dark w-100"
                    >
                      {sendingLoading ? (
                        <ColorRing
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      ) : (
                        "+Add To Cart"
                      )}
                    </button>
                  </div>
                  <div className="addToWishList d-flex justify-content-end  position-absolute top-0 end-0 m-2 ">
                    <i
                      onClick={() => handelClick(data?.data.data.id)}
                      className={`   icon-hover-red fas fa-heart cursor-pointer fs-3  ${
                        wishlistData.data.data.find(
                          (el) => el.id === data?.data.data.id
                        )
                          ? "text-danger icon-hover-black"
                          : ""
                      }  `}
                    ></i>
                  </div>
                </div>
               
            </div>
          </div>
        </div>
      )}

      {/* <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-3">
              <figure>
                <img
                  src={data.data.data.imageCover}
                  alt={data.data.data.title}
                  className="w-100"
                />
              </figure>
            </div>
            <div className="col-md-9">
              <div className="productDetails">
                <h1>{data.data.data.title}</h1>
                <p>{data.data.data.description}</p>
                <p>price {data.data.data.price} EGp</p>
              </div>
            </div>
          </div>
        </div> */}
    </>
  );
}
