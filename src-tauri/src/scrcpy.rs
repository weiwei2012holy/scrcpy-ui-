use std::process::Command;
use crate::config;

#[tauri::command]
pub async fn connect(device_id: &str, args: Vec<String>) -> Result<u32, String> {
    println!("device_id: {}", device_id);
    println!("args: {:?}", args);
    // sleep(std::time::Duration::from_secs(5));
    // return Err("test".to_string());
    let cmd = config::get_cmd_scrcpy();
    let  child_process = Command::new(cmd?)
        .arg("-s")
        .arg(device_id).spawn().map_err(|e|"scrcpy启动失败:".to_string() + e.to_string().as_str())?;

    Ok(child_process.id())
}