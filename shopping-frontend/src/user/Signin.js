import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input type="password" className="form-control" />
            </div>
            <button className="btn btn-success btn-block"> Sign In </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base title="Signin Page" description="Page to signin User">
        {signinForm()}
      </Base>
    </div>
  );
};

export default Signin;
