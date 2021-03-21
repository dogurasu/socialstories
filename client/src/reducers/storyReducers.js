import {
    STORY_LIST_REQUEST,
    STORY_LIST_SUCCESS,
    STORY_LIST_FAIL,
    STORY_DETAIL_REQUEST,
    STORY_DETAIL_SUCCESS,
    STORY_DETAIL_FAIL,
    STORY_CREATE_REQUEST,
    STORY_CREATE_SUCCESS,
    STORY_CREATE_FAIL,
    STORY_CREATE_RESET,
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

export const storyDetailReducer = (state = { story: { comments: [] }}, action) => {
    switch(action.type) {
        case STORY_DETAIL_REQUEST:
            return {loading: true, ...state};
        case STORY_DETAIL_SUCCESS:
            return {loading: false, story: action.payload};
        case STORY_DETAIL_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const storyCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case STORY_CREATE_REQUEST:
            return {loading: true, ...state}
        case STORY_CREATE_SUCCESS:
            return {loading: false, createdStory: action.payload}
        case STORY_CREATE_FAIL:
            return {loading: false, error: "fail", message: action.payload}
        case STORY_CREATE_RESET:
            return {};
        default:
            return state;
    }
}