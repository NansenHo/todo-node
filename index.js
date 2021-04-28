const db = require('./db.js')
const inquirer = require('inquirer')

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
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务',
            choices: [{name: '+ 创建任务', value: '-2'},   ...list.map((item, index) => {
                    return {name: `${item.done ? '[v]' : '[x]'} ${index + 1} - ${item.task}`, value: index.toString()}
                }),
                {name: '<= 退出', value: '-1'}
            ]
        })
        .then(answer => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                // 用户选中了一个任务
                inquirer.prompt({
                    type: 'list',
                    name: 'action',
                    message: '请选择操作',
                    choices: [
                        {name: '退出', value: 'quit'},
                        {name: '已完成', value: 'markAsDone'},
                        {name: '未完成', value: 'markAsUnDone'},
                        {name: '重命名', value: 'updateTask'},
                        {name: '删除', value: 'remove'}
                    ]
                }).then(answer2 => {
                    switch (answer2.action) {
                        case 'markAsDone':
                            list[index].done = true
                            db.write(list)
                            break;
                        case 'markAsUnDone':
                            list[index].done = false
                            db.write(list)
                            break;
                        case 'updateTask':
                            inquirer.prompt({
                                type: 'input',
                                name: 'task',
                                message: "新的标题",
                                default: list[index].task
                            }).then(answer => {
                                list[index].task = answer.task
                                db.write(list)
                            });
                            break;
                        case 'remove':
                            list.splice(index, 1)
                            db.write(list)
                            break;
                    }
                })
            } else if (index === -2) {
                // 创建任务
                inquirer.prompt({
                    type: 'input',
                    name: 'task',
                    message: "输入任务标题",
                }).then(answer => {
                    list.push({
                        task: answer.task,
                        done: false
                    })
                    db.write(list)
                });
            }
        });
}