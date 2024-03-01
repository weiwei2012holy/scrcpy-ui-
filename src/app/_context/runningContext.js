import {createContext, useCallback, useContext, useState} from "react";

const RunningContext = createContext(undefined);


export const RunningProvider = ({children}) => {
    const [running, setRunning] = useState("")
    const updateRunning = (id) => {
        if (id !== running){
            setRunning(id)
            console.log("updateRunning===>", id, Date.now(), running)
        }
    }


    return (
        <RunningContext.Provider value={{running, updateRunning}}>
            {children}
        </RunningContext.Provider>
    )
}


export const useRunning = () => {
    const ctx = useContext(RunningContext)
    if (ctx === undefined) {
        throw new Error('useRunning must be used within a RunningProvider')
    }
    return ctx
}