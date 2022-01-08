import axios from "axios";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const axiosFuntion = (data, url, method = "post") => {
  return axios({
    method: method,
    url: `http://localhost:5000${url}`,
    data: { ...data, token: getCookie("tokenLogin") },
  });
};

export default axiosFuntion;
