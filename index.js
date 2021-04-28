const db = require('./db.js')

module.exports.add = async (task) => {
    // 在 home 目录里读取到之前的任务文件
    const list = await db.read()
    // 添加一个 task
    list.push({task, done: false})
    // 存储任务到文件
    await db.write(list)
}