use std::process::Command;
use regex::Regex;
use std::io::{BufReader, BufRead};
use serde::Serialize;
use crate::config;

#[derive(Debug)]
#[derive(Serialize)] //需要实现序列化
pub struct Device {
    pub id: String,
    pub model: String,
    pub market_name: String,
    pub brand: String,
}

#[tauri::command]
pub fn devices() -> Result<Vec<Device>, String> {

    // 调用 ADB 命令
    let output = Command::new(config::get_cmd_adb()?)
        .arg("devices")
        .output()
        .map_err(|e| e.to_string())?;
    // 输出 ADB 命令的输出
    if output.status.success() == false {
        let error = String::from_utf8_lossy(&output.stderr);
        return Err(error.to_string());
    }
    let result = String::from_utf8_lossy(&output.stdout);
    let device_ids = extract_device_ids(result.as_bytes());

    let mut devices: Vec<Device> = Vec::new();
    for device_id in device_ids {
        let device = Device {
            id: device_id.clone(),
            model: shell(&device_id, "getprop ro.product.model").unwrap_or_default(),
            market_name: shell(&device_id, "getprop ro.product.marketname").unwrap_or_default(),
            brand: shell(&device_id, "getprop ro.product.brand").unwrap_or_default(),
        };
        devices.push(device);
    }
    Ok(devices)
}


pub fn shell(device_id: &str, command: &str) -> Result<String, String> {
    // 调用 ADB 命令
    let output = Command::new(config::get_cmd_adb()?)
        .arg("-s")
        .arg(device_id)
        .arg("shell")
        .arg(command)
        .output()
        .map_err(|e| e.to_string())?;
    // 输出 ADB 命令的输出
    if output.status.success() == false {
        let error = String::from_utf8_lossy(&output.stderr);
        return Err(error.to_string());
    }
    let result = String::from_utf8_lossy(&output.stdout);
    Ok(result.trim().to_string())
}

// 提取设备 ID 信息到数组
fn extract_device_ids(output: &[u8]) -> Vec<String> {
    let mut device_ids: Vec<String> = Vec::new();
    let re = Regex::new(r"^(\S+)\s+device$").unwrap();

    let reader = BufReader::new(output);
    for line in reader.lines() {
        if let Ok(line) = line {
            if let Some(captures) = re.captures(&line) {
                if let Some(device_id) = captures.get(1) {
                    device_ids.push(device_id.as_str().to_string());
                }
            }
        }
    }

    device_ids
}

#[tauri::command]
pub async fn adb(device_id: &str, args: Vec<String>) -> Result<bool, String> {
    // return Err("test".to_string());
    let output = Command::new(config::get_cmd_adb()?)
        .arg("-s")
        .arg(device_id)
        .args(args)
        .output()
        .map_err(|e| e.to_string())?;
    if output.status.success() == false {
        let error = String::from_utf8_lossy(&output.stderr);
        return Err(error.to_string());
    }
    Ok(true)
}


#[cfg(test)]
mod tests_adb {
    use crate::adb;

    #[test]
    fn test_devices() {
        let devices = adb::devices();
        println!("{:?}", devices);
    }
}
