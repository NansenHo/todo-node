const db = require('./db.js')

module.exports.add = async (task) => {
    // 在 home 目录里读取到之前的任务文件
    const list = await db.read()
    // 添加一个 task
    list.push({task, done: false})
    // 存储任务到文件
    await db.write(list)
}

module.exports.clear = async (task) => {
    await db.write([])
}

module.exports.showAll = async () => {
    // 读取之前的任务
    const list = await db.read()
    // 打印之前的任务
    list.forEach((item, index) => {
        console.log(`${item.done ? '[v]' : '[x]'} ${index + 1} - ${item.task}`);
        // 注意，别从 0 开始，给 index 加个 1
    })
}