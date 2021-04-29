#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')
// package 是 JS 的保留字，所以这里用了缩写 pkg

program
    .version(pkg.version)
    // 如此用户即可通过 node cli --version 查看该程序的版本
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const task = args.slice(0, -1).join(' ')
        api.add(task).then(() => {
            console.log('添加成功');
        }, () => {
            console.log('添加失败');
        })
        // add 返回了一个 Promise，我们需要对这个 Promise 做一些处理
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(() => {
            console.log('清除完毕');
        }, () => {
            console.log('清楚失败');
        })
    });

program.parse(process.argv);

// console.log(process.argv); // process.argv 就是用户传的参数

if (process.argv.length === 2) {
    // node cli
    void api.showAll() // void 是为了消除 webstorm 的报错，表示不管 showAll 传过来的 Promise
}