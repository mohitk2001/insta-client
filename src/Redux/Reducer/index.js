import add_Reducer from "./Add_Reducer";
import redux_data from "./Add_details";
import { combineReducers } from "redux";
const rootReducer=combineReducers({
    add_Reducer,
    redux_data
})

export default rootReducer