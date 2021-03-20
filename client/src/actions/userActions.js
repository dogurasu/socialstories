import { 
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userConstants"
import axios from "axios";

export const getSingleUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_DETAIL_REQUEST});
            const { data } = await axios.get(`/api/v1/stories/${id}`);
            dispatch({type: USER_DETAIL_SUCCESS, payload: data});
        } catch(error) {
            dispatch({
                type: USER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_LOGIN_REQUEST});
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post("/api/v1/users/login", {email, password}, config);
            dispatch({type: USER_LOGIN_SUCCESS, payload: data});

            // localStorage.setItem('userInfo', JSON.stringify(data));
        } catch(error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const signup = (name, username, email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            })
            const { data } = await axios.post("/api/v1/users", {name, username, email, password}, {headers: {"Content-Type": "application/json"}});
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })
        } catch(err) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }
}