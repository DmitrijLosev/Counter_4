import {MinMaxType} from "../App";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "./store";

const initialState = {
    counter: 0,
    minMaxValue: {minValue: 0, maxValue: 1},
    isSettingMode: false
}
export type CounterStateType = typeof initialState
export type CounterActionsType =
    typeof actions.incCounter
    | typeof actions.resetCounter
    | ReturnType<typeof actions.changeMinMaxValues>
    | ReturnType<typeof actions.changeSettingMode>
    | ReturnType<typeof actions.setCounter>
export const counterReducer = (state = initialState, action: CounterActionsType):
    CounterStateType => {
    switch (action.type) {
        case "SET-COUNTER":
            return {...state, counter: action.payload.counter}
        case "INCREMENT-COUNTER":
            return {...state, counter: state.counter + 1}
        case "RESET-COUNTER":
            return {...state, counter: state.minMaxValue.minValue}
        case "CHANGE-MINMAX-VALUE":
            return {...state, minMaxValue: {...state.minMaxValue, [action.payload.name]: action.payload.newValue}}
        case "CHANGE-SETTING-MODE":
            return {...state, isSettingMode: action.payload.isSettingMode}
        default:
            return state
    }
}
export const actions = {
    incCounter: {type: "INCREMENT-COUNTER"} as const,
    resetCounter: {type: "RESET-COUNTER"} as const,
    changeMinMaxValues: (newValue: number, name: keyof MinMaxType) => ({
        type: "CHANGE-MINMAX-VALUE",
        payload: {newValue, name}
    }) as const,
    changeSettingMode: (isSettingMode: boolean) => ({type: "CHANGE-SETTING-MODE", payload: {isSettingMode}}) as const,
    setCounter:(counter:number) => ({type:"SET-COUNTER", payload:{counter}}) as const
}

export const setCounterStateTC =() =>(dispatch:ThunkDispatch<RootStateType, unknown, CounterActionsType>)=>{
    let stateFromLS = localStorage.getItem("state");
    if(stateFromLS) {
        let state:RootStateType = JSON.parse(stateFromLS);
        dispatch(actions.setCounter(state.counter))
        dispatch(actions.changeMinMaxValues(state.minMaxValue.minValue, "minValue"))
        dispatch(actions.changeMinMaxValues(state.minMaxValue.maxValue, "maxValue"))
        dispatch(actions.changeSettingMode(false))
    }
}


export const incCounterTC = () => (dispatch: ThunkDispatch<RootStateType, unknown, CounterActionsType>, getState: () => RootStateType) => {
    let state = getState()
    localStorage.setItem("state", JSON.stringify({...state, counter:state.counter+1}));
    dispatch(actions.incCounter)
}

export const resetCounterTC = () =>
    (dispatch: ThunkDispatch<RootStateType, unknown, CounterActionsType>, getState: () => RootStateType) => {
    let state = getState()
    localStorage.setItem("state", JSON.stringify({...state, counter:state.minMaxValue.minValue}));
    dispatch(actions.resetCounter)
}
export const changeSettingsModeTC = (isSettingsMOde:boolean) =>
    (dispatch: ThunkDispatch<RootStateType, unknown, CounterActionsType>, getState: () => RootStateType) => {
    let state = getState()
    localStorage.setItem("state", JSON.stringify({...state, isSettingMode:isSettingsMOde}));
    dispatch(actions.changeSettingMode(isSettingsMOde))
}
export const setSettingsTC = () => (dispatch: ThunkDispatch<RootStateType, unknown, CounterActionsType>, getState: () => RootStateType) => {
    let state = getState()
    localStorage.setItem("state",
        JSON.stringify({...state, isSettingMode:false,counter:state.minMaxValue.minValue}));
    dispatch(actions.resetCounter)
    dispatch(actions.changeSettingMode(false))
}
export const setMinMaxValuesTC = (value:number , propertyName:keyof MinMaxType) =>
    (dispatch: ThunkDispatch<RootStateType, unknown, CounterActionsType>, getState: () => RootStateType) => {
    let state = getState()
    localStorage.setItem("state", JSON.stringify({...state,  minMaxValue:{...state.minMaxValue,
            [propertyName]:value}}));
    dispatch(actions.changeMinMaxValues(value,propertyName))
}