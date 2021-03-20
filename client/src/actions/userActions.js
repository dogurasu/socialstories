import {
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_STORIES_REQUEST,
    USER_STORIES_SUCCESS,
    USER_STORIES_FAIL,
} from "../constants/userConstants"
import axios from "axios";

export const getSingleUser = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: USER_DETAIL_REQUEST});
            const { userLogin: { userInfo }} = getState();
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`/api/v1/users/${id}`, config);
            // console.log(data);
            dispatch({type: USER_DETAIL_SUCCESS, payload: data});
        } catch(error) {
            dispatch({
                type: USER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
};

export const getUserStories = (userID, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_STORIES_REQUEST});
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`/api/v1/stories/user/${userID}`, config);
            // console.log(data);
            dispatch({type: USER_STORIES_SUCCESS, payload: data});
        } catch(err) {
            dispatch({
                type: USER_STORIES_FAIL,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }
}

export const updateUser = (summary, email, id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: USER_UPDATE_REQUEST});
            const { userLogin: { userInfo }} = getState();
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const res = await axios.post(`/api/v1/users/${id}`, {email, summary}, config);
            dispatch({type: USER_UPDATE_SUCCESS, payload: res.data})
            // localStorage.setItem('userUpdate', JSON.stringify(res.data));
        } catch(error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

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
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch(error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const logout = () => {
    return function(dispatch) {
        localStorage.removeItem("userInfo");
        dispatch({type: USER_LOGOUT});
        dispatch({type: USER_DETAIL_RESET});
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