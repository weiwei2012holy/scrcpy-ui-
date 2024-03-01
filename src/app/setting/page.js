"use client"
import {invoke} from '@tauri-apps/api/tauri'
import {useEffect, useState} from "react";

export default function Setting() {
    const [cfg, setCfg] = useState(null)


    useEffect(() => {
        invoke('get_config')
            .then((cfg) => {
                setCfg(cfg)
                console.log(cfg)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])

    return (
        <form className="form-control w-full max-w-xs p-2">
            <label>
                <div className="label">
                    <span className="label-text">adb 命令路径</span>
                </div>
                <input type="text" placeholder="命令行运行adb的完整路径" className="input input-bordered input-sm w-full max-w-xs"
                       defaultValue={cfg?.adb}/>
            </label>
            <label>
                <div className="label">
                    <span className="label-text">scrcpy 命令路径</span>
                </div>
                <input type="text" placeholder="命令行运行scrcpy的完整路径" className="input input-bordered input-sm w-full max-w-xs"
                       defaultValue={cfg?.scrcpy}/>
            </label>
        </form>

    )
        ;
}