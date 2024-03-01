import { useRunning} from "@/app/_context/runningContext";

export default function Footer() {
    const {running} = useRunning()
    console.log("Footer.running===>", running)
    return (
        <>
            {
                running?.length === 0 ? (<p>请连接设备后运行</p>) : (<p>正在运行的任务：{running}</p>)
            }
        </>

    )
}