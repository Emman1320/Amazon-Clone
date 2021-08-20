import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-8d46b.cloudfunctions.net/api", //THE API (cloud function) URL
  
});

export default instance;
