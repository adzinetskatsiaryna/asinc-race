import {combineReducers, createStore} from "redux";
import {garageReducer} from "./garage-reducer";
import {winnersReducer} from "./winners-reducer";




const reducers = combineReducers({
    garage: garageReducer,
    winners: winnersReducer
});
export type ReducerAppType = ReturnType<typeof reducers>


const store = createStore(reducers);
export default store;

// @ts-ignore
window.store = store


