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
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Go to Dashboard
        </Link>
      </div>
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

    createCategory(user._id, token, { categoryName })
      .then((data) => {
        if (data.error) {
          setSuccess(false);
          setError(error);
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
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-warning">Error in category creation</h4>;
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
        <div className="col-8 offset-md-2">
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
