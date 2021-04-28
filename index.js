// 获取到用户的 home 目录
const homedir = require('os').homedir(); //// nodejs 获取用户的 home 目录
const home = process.env.HOME || homedir; //// nodejs 获取系统的环境变量
const p = require('path') //// path 是 nodejs 提供的专门用来将字符串拼接成路径的方法
const dbPath = p.join(home, '/.todo')
const fs = require('fs')
const db = require('./db.js')

module.exports.add = async (task) => {
    // 在 home 目录里读取到之前的任务文件
    const list = await db.read()
    // 添加一个 task
    list.push({task, done: false})
    // 存储任务到文件
    await db.write(list)
}