import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle, ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Product() {
  const { wishlistData } = useContext(cartContext);

  // function that Get All Data From Product Api BY USeQuery
  // شغل ده بعد متخلص تجربة
  function getAllProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoading, isError, refetch } = useQuery(
    "allProducts",
    getAllProduct,
    {
      cacheTime: 5000,
      refetchInterval: 1000,
      enabled: true,
    }
  );

  const { addProductToCart } = useContext(cartContext);

  const [sendingLoading, setSendingLoading] = useState(false);

  async function addProduct(id) {
    setSendingLoading(true);
    const res = await addProductToCart(id);
    if (res.status == "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
    } else {
      toast.error("Error Happend", { position: "top-center", duration: 2000 });
    }
    setSendingLoading(false);
  }

  // Add Product To WishList

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
        <title>All Products</title>
      </Helmet>
      <div className="container  pb-5 mb-5">
        <h1 className="py-2 my-3">All Products</h1>

        {isLoading ? (
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
          <div className="row gy-2">
            {data?.data.data?.map(function (product, indx) {
              return (
                <div key={indx} className="col-md-3  ">
                  <div className="product position-relative p-2 rounded  ">
                    <Link
                      to={`/productDetails/${product.id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={product.imageCover}
                        className="w-100 "
                        alt="prod"
                      />
                      <h5 className="main-color">
                        {product.title.split(" ").splice(0, 2).join(" ")}
                      </h5>
                      <h6 className="text-black">{product.category.name}</h6>
                      <div className="p-1 mt-2 d-flex justify-content-between align-content-center">
                        <p className="fw-bold text-black">
                          {product.price} EGp
                        </p>

                        <p className="text-black">
                          <span>
                            <i className="fa-solid fa-star stars-color"></i>
                          </span>
                          {product.ratingsAverage}
                        </p>
                      </div>
                    </Link>

                    <div className="addToWishList  d-flex justify-content-end">
                      <i
                        onClick={() => handelClick(product.id)}
                        className={`   icon-hover-red fas fa-heart cursor-pointer fs-3  ${
                          wishlistData.data.data.find(
                            (el) => el.id === product.id
                          )
                            ? "text-danger icon-hover-black"
                            : ""
                        }  `}
                      ></i>
                    </div>
                    <div className="addProductYoCart position-relative navigatetoCartBtn  ">
                      <button
                        onClick={() => addProduct(product.id)}
                        className=" btn btn-danger  w-100   "
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
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* <div className=" d-flex justify-content-end m-0 bg-info my-4 ">
                      <div className="heart-red col-md-6 text-center">
                        <button
                          onClick={() => {
                            addToWishList(product.id);
                          }}
                          className="border-0 btn   "
                        >
                          <i className="fa-solid fa-heart fa-2x text-danger"></i>
                        </button>
                      </div>

                      <div className="heart-black col-md-6 text-center">
                        <button
                          onClick={() => {
                            deletFromWishList(product.id);
                          }}
                          className="border-0 btn  "
                        >
                          <i className="fa-solid fa-heart fa-2x black-color"></i>
                        </button>
                      </div>
                    </div> */}
      </div>
    </>
  );
}
