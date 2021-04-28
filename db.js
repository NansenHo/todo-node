const homedir = require('os').homedir(); //// nodejs 获取用户的 home 目录
const home = process.env.HOME || homedir; //// nodejs 获取系统的环境变量
const p = require('path') //// path 是 nodejs 提供的专门用来将字符串拼接成路径的方法
const dbPath = p.join(home, '/.todo')
const fs = require('fs')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) return reject(error)
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const taskStr = JSON.stringify(list)
            fs.writeFile(path, taskStr + '\n', (error) => {
                if (error) return reject(error)
                resolve()
            })

        })
    }
}

module.exports = db