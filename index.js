// 获取到用户的 home 目录
const homedir = require('os').homedir(); //// nodejs 获取用户的 home 目录
const home = process.env.HOME || homedir; //// nodejs 获取系统的环境变量
const p = require('path') //// path 是 nodejs 提供的专门用来将字符串拼接成路径的方法
const dbPath = p.join(home, '/.todo')
const fs = require('fs')

module.exports.add = (task) => {
// 在 home 目录里读取到之前的任务文件
    fs.readFile(dbPath, {flag: 'a+'}, (error, data)=>{
        if(error) {
            console.log(error)
        } else {
            let list
            try {
                list = JSON.parse(data.toString()) //
            } catch (error2){
                list = []
            }
            console.log(list);
// 再往里面添加任务
            const theTask = {
                task: task,
                done: false,
            }
            list.push(theTask)
            const taskStr = JSON.stringify(list)
            fs.writeFile(dbPath, taskStr+'\n', (error3)=>{
                if(error3){
                    console.log(error3);
                }
            })
        }
// 存储任务到文件
    })
}