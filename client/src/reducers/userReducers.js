import {
    USER_STORIES_REQUEST,
    USER_STORIES_SUCCESS,
    USER_STORIES_FAIL,
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
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const userStoryReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_STORIES_REQUEST:
            return {loading: true};
        case USER_STORIES_SUCCESS:
            return {loading: false, stories: action.payload}
        case USER_STORIES_FAIL:
            return {loading: false, message: action.payload}
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    // console.log("")
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true};
        case USER_UPDATE_SUCCESS:
            return {loading: false, update: action.payload};
        case USER_UPDATE_FAIL:
            return {loading: false, message: action.payload};
        default:
            return state;
    }
}

export const userRequestReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_DETAIL_REQUEST:
            return {loading: true};
        case USER_DETAIL_SUCCESS:
            return {loading: false, userDetails: action.payload}
        case USER_DETAIL_FAIL:
            return {loading: false, message: action.payload}
        case USER_DETAIL_RESET:
            return { user: {}};
        default:
            return state;
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true};
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload, status: "success"};
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload, status: "fail"};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userSignupReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, message: "success", error: false};
        case USER_REGISTER_FAIL:
            return {loading: true, message: "fail", error: true};
        default: 
            return state;
    }
}