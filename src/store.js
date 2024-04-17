import { createStore,applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import basicReducer from "./Redux/Reducers/basicreducer.js";
import rootReducer from "./Redux/Reducers/rootreducer.js";


const store = createStore(rootReducer,applyMiddleware(thunk))

export default store
