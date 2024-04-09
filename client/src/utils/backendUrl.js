// backendUrl.js
const backendUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
    return "http://localhost:5000/";
  } else {
    return "http://localhost:5000/";
  }
};

export default backendUrl;
