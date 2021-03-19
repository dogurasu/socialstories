import { 
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
} from "../constants/userConstants"
import axios from "axios";

export const getSingleUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_DETAIL_REQUEST});
            // const { data } = await axios.get(`/api/v1/stories/${id}`);
            dispatch({type: USER_DETAIL_SUCCESS, payload: data});
        } catch(err) {
            dispatch({
                type: USER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
};