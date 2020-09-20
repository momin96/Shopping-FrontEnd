import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Go to Dashboard
      </Link>
    );
  };

  const handleChanges = (event) => {
    setError("");
    setCategoryName(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Backend Request fire

    createCategory(user._id, token, { name: categoryName })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setCategoryName("");
        }
      })
      .catch((error) => {
        setSuccess(false);
        setError(error);
      });
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter Category</p>

          <input
            type="text"
            className="form-control"
            autoFocus
            required
            placeholder="Eg: Summer"
            onChange={handleChanges}
            value={categoryName}
          />
        </div>
        <button className="btn btn-outline-info mb-3" onClick={onSubmit}>
          Create Category
        </button>
      </form>
    );
  };

  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="text-warning">
          Error in category creation with Error: {error}
        </h4>
      );
    }
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Create Successfully</h4>;
    }
  };

  return (
    <Base
      title="Create Category"
      description="add new category here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-md-2 mt-4">
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
