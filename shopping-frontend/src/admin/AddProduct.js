import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicall";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    productCategories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    stock,
    productCategories,
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

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4> Product create successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-warning mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Error: {JSON.stringify(error)}</h4>
      </div>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChanges = (fieldName) => (event) => {
    const value =
      fieldName === "photo" ? event.target.files[0] : event.target.value;
    formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const createProductForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("name")}
            value={name}
            placeholder="Enter Name here"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("description")}
            value={description}
            placeholder="Enter Description here"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChanges("price")}
            value={price}
            placeholder="Enter Price"
          />
        </div>

        <div className="form-group">
          <select
            placeholder="Category"
            className="form-control"
            onChange={handleChanges("category")}
            value={category}
          >
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
            onChange={handleChanges("stock")}
            value={stock}
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
            onChange={handleChanges("photo")}
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
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
