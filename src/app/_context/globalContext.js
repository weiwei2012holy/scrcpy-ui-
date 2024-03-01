
import {createContext, useContext, useState} from "react";
const GlobalContext = createContext({})

export const MessageType = {
    success: "success",
    error: "error",
    info: "info",
    warning: "warning"
}


export const GlobalProvider = ({children}) => {
    const [message,setMessage] = useState({})

    const updateMessage = (message,type) => {
        console.log("updateMessage===>", message, type)
        setMessage({
            message,
            type
        })
    }

    return (
        <GlobalContext.Provider value={{message,updateMessage}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => useContext(GlobalContext)