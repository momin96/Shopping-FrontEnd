/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { BASEURL } from "../../constants";
import { getProductImage } from "./coreapicalls";

// product/photo/:productId
const ImageHelper = ({ product }) => {
  // const imageURL = product
  //   ? `${BASEURL}/product/photo/${product._id}`
  //   : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  useEffect(() => {
    // if (product) {
    //   fetchImage();
    // } else {
    setPhoto(
      "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    );
    // }
  }, []);

  const [photo, setPhoto] = useState("");

  const fetchImage = () => {
    // TODO: Need to work on fetching of product image
    getProductImage(product._id).then((data) => {
      //console.log("image Data ", data);
      // let imageURL = URL.createObjectURL(data);
      setPhoto(data);
      // if (data.photoURL) {
      //   console.log("data ", data.photoURL);
      //   setPhoto(data.photoURL);
      // }
    });
  };

  return (
    <div className="rounded border border-success p-2">
      <img
        src={photo}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
