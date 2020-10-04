const { BASEURL } = require("../../constants");

// ****************** Category API ********************

// Create Category
export const createCategory = (userId, token, categoryName) => {
  return fetch(`${BASEURL}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryName),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in createCategory ");
    });
};

// Get all Categories
export const getCategories = () => {
  return fetch(`${BASEURL}/category/getAll`, {
    method: "GET",
  })
    .then((response) => {
      let jsonData = response.json();
      return jsonData;
    })
    .catch((error) => console.log(error));
};

// ****************** Product API ********************

// Create product
export const createProduct = (user, token, product) => {
  return fetch(`${BASEURL}/product/create/${user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Get All product
export const getAllProducts = () => {
  return fetch(`${BASEURL}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log("Error in Get app Products ", error));
};

// Get Single product
export const getProduct = (productId) => {
  return fetch(`${BASEURL}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// Update Product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${BASEURL}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      //"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      let jsonResponse = response.json();
      console.log("jsonResponse ", jsonResponse);
      return jsonResponse;
    })
    .catch((error) => console.log(error));
};

// Delete Product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${BASEURL}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
