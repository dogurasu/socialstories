import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    storyListReducer,
    storyDetailReducer,
} from "../src/reducers/storyReducers";

const rootReducer = combineReducers({
    stories: storyListReducer,
    storyDetails: storyDetailReducer,
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