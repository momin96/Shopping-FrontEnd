import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChanges = (changedField) => (event) => {
    setValues({
      ...values,
      error: false,
      [changedField]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({
      name,
      email,
      password,
    })
      .then((data) => {
        console.log("data ", data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log("Error in Signup");
      });
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Your account created successfully, Click{" "}
        <Link to="/signin"> Here to Login </Link>
      </div>
    );
  };

  const showMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {errorMessage()}
          {successMessage()}
        </div>
      </div>
    );
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChanges("name")}
                className="form-control"
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChanges("email")}
                className="form-control"
                type="text"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChanges("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
            <p className="text-white text-center">{JSON.stringify(values)}</p>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base title="Signup Page" description="Page to signup User!">
        {showMessage()}
        {signupForm()}
      </Base>
    </div>
  );
};

export default Signup;
