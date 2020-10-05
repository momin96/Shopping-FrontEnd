const { BASEURL } = require("../../constants");
export const getProducts = () => {
  return fetch(`${BASEURL}/products`, { method: "GET" })
    .then((response) => {
      let responseJson = response.json();
      return responseJson;
    })
    .catch((error) => console.log("Error in getProduct ", error));
};

export const getProductImage = (productId) => {
  return fetch(`${BASEURL}/product/photo/${productId}`, { method: "GET" })
    .then((response) => {
      let uinitArray = response.arrayBuffer();

      var blob = new Blob([uinitArray], { type: "image/bmp" });

      let jURL = URL.createObjectURL(blob);
      console.log("Response Data ", jURL);

      return jURL;
    })
    .catch((error) => console.log("Error in Fetching photo"));
};
