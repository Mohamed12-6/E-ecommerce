import { useState } from "react";
import { createContext } from "react";

export let CounterContext=createContext(0)

export function CounterContextProvider(props) {
    let [count,setcount]=useState(0);

    return <CounterContext.Provider value={{count,setcount}}>
        {props.children}
    </CounterContext.Provider>
}