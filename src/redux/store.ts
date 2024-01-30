import {applyMiddleware, legacy_createStore} from "redux";
import {counterReducer} from "./counter-reducer";
import {thunk} from "redux-thunk";


export type RootStateType=ReturnType<typeof counterReducer>
export const store = legacy_createStore(
    counterReducer,applyMiddleware(thunk));

