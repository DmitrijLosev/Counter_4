import React, {useEffect} from "react";
import {Counter} from "./Counter";
import {Button} from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {
    changeSettingsModeTC,
    CounterActionsType,
    CounterStateType,
    incCounterTC,
    resetCounterTC, setCounterStateTC
} from "./redux/counter-reducer";
import {MinMaxType} from "./App";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "./redux/store";

export const CounterShowMode: React.FC<{ errorMode: boolean }> = ({errorMode}) => {

    const dispatch = useDispatch<ThunkDispatch<RootStateType, unknown, CounterActionsType>>()
    const {minValue,maxValue}=useSelector<CounterStateType,MinMaxType>(state=>state.minMaxValue)

    const counter=useSelector<CounterStateType,number>(state=>state.counter)

    useEffect(()=>{
        dispatch(setCounterStateTC())
    },[dispatch])
    const onClickIncrementCounterHandler = () => {
        if (counter < maxValue) {
            dispatch(incCounterTC())
        }
    }
    const onClickResetCounterHandler = () => {
        if (counter > minValue) {
            dispatch(resetCounterTC())
        }
    }
    const onClickSetSettingsModeHandler = () => {
        dispatch(changeSettingsModeTC(true))
    }

    return (
        <div className="counter common">
            <Counter counter={counter} maxValue={maxValue}
                     errorMode={errorMode}/>
            <div className="buttons common">
                <Button onClick={onClickIncrementCounterHandler}
                        disabled={counter === maxValue || errorMode}>
                    inc
                </Button>
                <Button onClick={onClickResetCounterHandler}
                        disabled={counter === minValue || errorMode}>
                    reset
                </Button>
                <Button onClick={onClickSetSettingsModeHandler}>
                    set
                </Button>
            </div>
        </div>
    );
};

