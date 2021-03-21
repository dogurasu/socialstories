import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    storyListReducer,
    storyDetailReducer,
    storyCreateReducer
} from "../src/reducers/storyReducers";
import {
    userLoginReducer,
    userSignupReducer,
    userRequestReducer,
    userUpdateReducer,
    userStoryReducer,
} from "../src/reducers/userReducers";

const rootReducer = combineReducers({
    stories: storyListReducer,
    storyDetails: storyDetailReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userDetails: userRequestReducer,
    userUpdate: userUpdateReducer,
    userStories: userStoryReducer,
    createdStory: storyCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

const initialState = {
    stories: {},
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;