import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
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
    preload(match.params.productId);
  }, []);

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          productCategories: data,
          formData: new FormData(),
        });
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
        <h4> Product Updated successfully</h4>
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

  const onUpdate = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
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
      })
      .catch((error) => console.log("Error in update ", error));
  };

  const handleChanges = (fieldName) => (event) => {
    const value =
      fieldName === "photo" ? event.target.files[0] : event.target.value;
    formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const updateProductForm = () => {
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
            {productCategories.map((category, index) => (
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

        <button className="btn btn-outline-info mb-3" onClick={onUpdate}>
          Update
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Update Product"
      description="Update product details here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-md-2 mt-4">
          {successMessage()}
          {errorMessage()}
          {updateProductForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
