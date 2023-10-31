import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle, ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function WishList() {
  /*
  async function getWishList() {
    try {
      const x = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(x);
    } catch (error) {
      console.log("getWishList Error =>", error);
    }
  }
  useEffect(() => {
    getWishList();
  }, []);


*/

  const { wishlistData, wishListLoading, addProductToCart } =
    useContext(cartContext);
  // console.log(wishlistData?.data.data[0].id);
  // async function getWishList() {
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
  //     headers: { token: localStorage.getItem("token") },
  //   });
  // }

  // const { data, isLoading, isError, isFetching } = useQuery(
  //   "getWishList",
  //   getWishList,
  //   {
  //     cacheTime: 5000,
  //     refetchInterval: 3000,
  //     enabled: true,
  //   }
  // );
  // console.log("is Loading => ", isLoading);

  if (wishListLoading) {
    return (
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
    );
  }
  // console.log("is Loading => ", isLoading);
  // console.log(wishlistData?.data.data.length);
  if (wishlistData?.data.data.length == 0) {
    return (
      <div
        className="container   my-5 bg-light py-3    "
        style={{ height: "460px" }}
      >
        <div className="p-3 d-flex justify-content-between alert alert-info text-capitalize">
          <h3>there is no products In your Wish List</h3>
          <div>
            <Link to="/product">
              <button className="btn btn-info p-2 text-capitalize">
                add some Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function deletFromWishList(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      toast.success(data?.message);
    } catch (error) {
      console.log("addToWishList Error", error);
      // toast.error(data?.message);
    }
  }


  
  // const [addLoading, setAddLoading] = useState(false);
  async function addWishProductToCart(id) {
    // setAddLoading(true);
    const res = await addProductToCart(id);
    if (res.status == "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
    } else {
      toast.error("Error Happend", { position: "top-center", duration: 2000 });
    }
    // setAddLoading(false);
  }

  return (
    <>
    <Helmet>
        <title>Wish List</title>
      </Helmet>
      <div className="container text-capitalize py-2 my-3  pb-5 mb-5">
        {wishlistData?.data.data.map(function (product, idx) {
          return (
            <div
              key={idx}
              className="row my-3 p-2 rounded-4  "
              style={{ backgroundColor: "#ece6e6" }}
            >
              <div className="col-md-2 p-0 rounded-3">
                <div className="category-cart productImg rounded-3">
                  <img src={product.imageCover} alt="" className="w-100" />
                </div>
              </div>
              <div className="col-md-6 ">
                <div
                  className="productDetails "
                  style={{ backgroundColor: " " }}
                >
                  <h2>{product.title.split(" ").slice(0, 2).join(" ")} </h2>
                  <p className="text-muted">{product.description}</p>
                  <h4>price :{product.price}Egp</h4>
                </div>
              </div>
              <div className="col-md-4  p-0 m-0 d-flex align-items-end justify-content-end   ">
                <div className="  w-100  d-flex align-items-end justify-content-between ">
                  <button
                    onClick={() => addWishProductToCart(product.id)}
                    className=" btn btn-success "
                  >
                    {/* {addLoading ? (
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
                  )} */}
                    +Add To Cart
                  </button>

                  <button
                    onClick={() => {
                      deletFromWishList(product.id);
                    }}
                    className="btn btn-danger "
                  >
                    remove from WishCart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
