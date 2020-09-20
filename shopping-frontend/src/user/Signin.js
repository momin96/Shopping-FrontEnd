import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { isAuthenticated, signin, authenticate } from "../auth/helper";

export default function Signin() {
  const [values, setValues] = useState({
    email: "nasir@mmin.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const errorMessage = () => {
    return (
      <>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert.info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const showMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {errorMessage()}
          {loadingMessage()}
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleChanges = (changedField) => (event) => {
    setValues({ ...values, [changedField]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            console.log("data :", data);
            setValues({
              ...values,
              didRedirect: true,
              email: "",
              password: "",
            });
          });
        }
      })
      .catch((error) => {
        console.log("Signin request failed");
        console.log("error", error);
      });
  };

  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChanges("email")}
                type="text"
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChanges("password")}
                type="password"
                className="form-control"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base title="Signin Page" description="Page to signin User">
        {showMessage()}
        {signinForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        {performRedirect()}
      </Base>
    </div>
  );
}

// export default Signin;
