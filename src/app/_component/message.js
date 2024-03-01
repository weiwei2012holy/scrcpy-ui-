import {useGlobal} from "@/app/_context/globalContext";
import {useEffect, useState} from "react";

export default function Message() {

    const {message, updateMessage} = useGlobal()
    console.log("message===>", message)


    return (
        <div>
            {
                message.message?.length > 0 ? <MessageBody message={message}/> : null
            }
        </div>

    )
}

function MessageBody({message}) {
    const {updateMessage} = useGlobal()
    const close = (e) => {
        updateMessage({})
    }
    const className = 'alert alert-' + message.type
    const messageId = Date.now()
    return (
        <div className="toast toast-top toast-end" key={messageId}>
            <div className={className}>
                <span>{message.message}</span>
                <button className="btn btn-sm" onClick={close}>X</button>
            </div>
        </div>
    )
}
