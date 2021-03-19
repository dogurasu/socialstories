import {
    STORY_LIST_REQUEST,
    STORY_LIST_SUCCESS,
    STORY_LIST_FAIL,
    STORY_DETAIL_REQUEST,
    STORY_DETAIL_SUCCESS,
    STORY_DETAIL_FAIL
} from "../constants/storyConstants";

export const storyListReducer = (state = { storyList: [] }, action) => {
    switch(action.type) {
        case STORY_LIST_REQUEST:
            return {
                loading: true,
                storyList: []
            }
        case STORY_LIST_SUCCESS:
            return {
                loading: false,
                storyList: action.payload
            }
        case STORY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const storyDetailReducer = (state = { story: { reviews: [] }}, action) => {
    switch(action.type) {
        case STORY_DETAIL_REQUEST:
            return {loading: true, ...state};
        case STORY_DETAIL_SUCCESS:
            return {loading: false, story: action.payload};
        case STORY_DETAIL_FAIL:
            return {loading: false, error: action.payload};
    }
}