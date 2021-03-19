import {
    STORY_LIST_REQUEST,
    STORY_LIST_SUCCESS,
    STORY_LIST_FAIL
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