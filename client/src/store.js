import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    storyListReducer,
    storyDetailReducer,
} from "../src/reducers/storyReducers";
import {
    userLoginReducer,
    userSignupReducer,
    userRequestReducer,
    userUpdateReducer,
} from "../src/reducers/userReducers";

const rootReducer = combineReducers({
    stories: storyListReducer,
    storyDetails: storyDetailReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userDetails: userRequestReducer,
    userUpdate: userUpdateReducer
})

const initialState = {
    stories: {},
    // user: { userInfo: "" }
}

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;