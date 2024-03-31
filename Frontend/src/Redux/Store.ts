import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { timeReducer } from "./TimeState";

// Single object containing all reducers:
const reducers = combineReducers({
    authState: authReducer,
    TimeState: timeReducer
});

const store = createStore(reducers);

export default store;
