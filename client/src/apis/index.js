import axios from "axios";
const host = "http://localhost";
const port = "5000"
export default axios.create({
    baseURL: `${host}:${port}`,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})