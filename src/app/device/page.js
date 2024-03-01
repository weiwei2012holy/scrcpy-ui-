"use client"
import {invoke} from '@tauri-apps/api/tauri'
import {useEffect, useState} from "react";
import {RunningProvider, useRunning} from "@/app/_context/runningContext";
import {MessageType, useGlobal} from "@/app/_context/globalContext";


export default function Device() {
    const [devices, setDevices] = useState([])

    const {updateMessage} = useGlobal()

    useEffect(() => {
        invoke('devices')
            .then((devices) => {
                setDevices(devices)
                console.log(devices)
            })
            .catch((e) => {
                console.error(e)
                updateMessage(e, MessageType.error)
            })
    }, [])


    return (
        <>
            <DeviceItems devices={devices}></DeviceItems>
        </>
    );
}

function DeviceItems({devices}) {
    return (
        <div className="flex gap-5 flex-wrap p-10">
            {devices.map((device) => (
                <DeviceItem key={device.id} device={device}></DeviceItem>
            ))}
        </div>
    );
}

function DeviceItem({device}) {
    const { updateRunning} = useRunning()
    const {updateMessage} = useGlobal()
    const handleClick = () => {
        updateRunning(device.id)
        // setTimeout(()=>{
        //     updateRunning("")
        //     updateErr("连接超时")
        // },2000)

        invoke('connect', {deviceId: device.id, args: []}).catch((e) => {
            updateMessage(e, MessageType.error)
        }).finally(() => {
            console.log("finally")
            updateRunning("")
        })
    }
    return (
        <div className="card w-64 bg-primary text-primary-content">
            <div className="card-body">
                <h2 className="card-title">{device.model}</h2>
                <div className="join join-horizontal space-x-2">
                    <div className="badge badge-secondary">{device.brand}</div>
                    <div className="badge badge-secondary">{device.market_name}</div>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn" onClick={handleClick}>连接
                    </button>
                </div>
            </div>
        </div>
    )
}

