import React from "react";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  return (
    <div>
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ManageCategories;
