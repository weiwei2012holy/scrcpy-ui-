use lazy_static::lazy_static;
use std::sync::Mutex;
use std::sync::MutexGuard;
use serde::Serialize;

#[derive(Debug)]
#[derive(Serialize)] //需要实现序列化
pub struct Config {
    pub adb: String,
    pub scrcpy: String,
}
lazy_static! {
    pub static ref CONFIG: Mutex<Config> = Mutex::new(Config {
        adb: String::from("adb"),
        scrcpy: String::from("scrcpy1"),
    });
}

pub fn get_cmd_adb() -> Result<String, String> {
    // 获取互斥锁的锁定（Lock）
    let config_lock: MutexGuard<Config> = CONFIG.lock().map_err(|error| error.to_string())?;
    // 读取配置选项
    Ok(config_lock.adb.clone())
}

pub fn get_cmd_scrcpy() -> Result<String, String> {
    // 获取互斥锁的锁定（Lock）
    let config_lock: MutexGuard<Config> = CONFIG.lock().map_err(|error| error.to_string())?;
    // 读取配置选项
    Ok(config_lock.scrcpy.clone())
}
#[tauri::command]
pub fn get_config() -> Result<Config,String> {
    let c = CONFIG.lock().map_err(|e| e.to_string())?;
    Ok(Config{
        adb: c.adb.clone(),
        scrcpy: c.scrcpy.clone(),
    })
}
