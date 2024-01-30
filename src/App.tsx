import React from "react";
import "./App.css";
import {CounterShowMode} from "./CounterShowMode";
import {SettingsMode} from "./SettingsMode";
import {useSelector} from "react-redux";
import {CounterStateType} from "./redux/counter-reducer";

export type MinMaxType = {
    minValue: number
    maxValue: number
}

function App() {

    const {minValue,maxValue}=useSelector<CounterStateType,MinMaxType>(state=>state.minMaxValue)
    const isSettingMode=useSelector<CounterStateType,boolean>(state=>state.isSettingMode)

    const errorMode =minValue < 0 || maxValue < 1 || maxValue <= minValue

    return (
        <div className="App">
            {isSettingMode ?
                <SettingsMode errorMode={errorMode} /> :
                <CounterShowMode errorMode={errorMode} />}
        </div>
    );
}

export default App;
