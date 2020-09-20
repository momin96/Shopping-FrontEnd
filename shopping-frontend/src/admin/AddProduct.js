import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories } from "./helper/adminapicall";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    productName: "Apple",
    productDescription: "Its a delicious Fruit",
    productPrice: "12",
    productStock: "30",
    photo: "",
    productCategories: [],
    selectedCategory: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    productName,
    productDescription,
    productPrice,
    productStock,
    productCategories,
    selectedCategory,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          productCategories: data,
          formData: new FormData(),
        });
        // Fetch Category bug
        console.log(productCategories);
      }
    });
  };

  const goBack = () => {
    return (
      <Link to="/admin/dashboard" className="btn btn-sm bg-success mb-3">
        Go to Dashboard
      </Link>
    );
  };

  const onSubmit = (e) => {
    //
  };

  const handleChanges = (fieldName) => (event) => {
    const value =
      fieldName === "photo" ? event.target.file[0] : event.target.value;

    formData.set((fieldName, value));

    setValues({ ...values, [fieldName]: event.target.value });
  };

  const createProductForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("productName")}
            value={productName}
            placeholder="Enter Name here"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("productDescription")}
            value={productDescription}
            placeholder="Enter Description here"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("productPrice")}
            value={productPrice}
            placeholder="Enter Price"
          />
        </div>

        <div className="form-group">
          <select placeholder="Category" className="form-control">
            <option value="">Select</option>
            {productCategories &&
              productCategories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("productStock")}
            value={productStock}
            placeholder="Enter Product Quantity"
          />
        </div>

        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="photo"
            accept="image"
            placeholder="Choose a file"
          />
        </div>

        <button className="btn btn-outline-info mb-3" onClick={onSubmit}>
          Create Product
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Create Product"
      description="Create New product here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-md-2 mt-4">
          {createProductForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
