const { BASEURL } = require("../../constants");

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
