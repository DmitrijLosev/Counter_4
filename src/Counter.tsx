import React from "react";
import {useSelector} from "react-redux";
import {CounterStateType} from "./redux/counter-reducer";

export const Counter:React.FC<{counter:number,maxValue:number,errorMode:boolean}> =
    ({counter,maxValue,errorMode}) => {

        const isSettingMode=useSelector<CounterStateType,boolean>(state=>state.isSettingMode)


    return (
        <div className={counter===maxValue && !isSettingMode ? "redTable table common" : "table common"}>
            {!isSettingMode && !errorMode && counter}
        </div>
    );
};

