import React from "react";

export default function Tagroba() {
  // async function handelClick(productId) {
  //   wishlistData.data.data.find((el) => el.id === productId)
  //     ? deletFromWishList(productId)
  //     : addToWishList(productId);
  // }
  return (
    <>
      <div className="bg-secondary hv-100 d-flex  justify-content-center  ">
        <div className="my-2 d-flex flex-column justify-content-between   w-50 h-75 bg-danger ">
            <div>
            <h2 className="text-center p-2"> order details </h2>
              <div
                className="row border-1 border-light my-2 rounded-4 "
                style={{ backgroundColor: "teal" }}
              >
                <div className="col-md-2 img">
                  <div className="imgOrder">
                    <img
                      src={require("../../images/slider-2.jpeg")}
                      className="w-100  rounded-3"
                      alt={"prooo"}
                    />
                  </div>
                </div>
                <div className="col-md-10 details ">
                  <div className="DetailsOfEachOrder  ">
                    <h4 className="py-2 pt-3">Lorem, ipsum dolor.</h4>
                    <div className="  py-2 d-flex justify-content-around align-items-center ">
                      <h4>price : 50</h4>
                      <h4>count : 10</h4>
                      <h4>
                        Total
                        <span className="main-bg-color rounded-3 p-2">
                          500
                        </span>{" "}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              

              <div className="totalCartPrice bg-light w-100 rounded-3 d-flex align-items-center justify-content-between p-3 ">
                <h3 className="">Total Order Price :</h3>
                <h3 className="  main-bg-color rounded-3 p-2 mx-2">500 EGp</h3>
              </div>
        </div>
      </div>
    </>
  );
}
