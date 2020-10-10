const { BASEURL } = require("../../constants");

const createOrder = (userId, token, orderData) => {
  return fetch(`${BASEURL}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      order: orderData,
    }),
  })
    .then((response) => {
      let jsonResponse = response.json();
      console.log("jsonresponse ", jsonResponse);
      return jsonResponse;
    })
    .catch((error) => {
      console.log("Error in Order creation ", error);
    });
};
