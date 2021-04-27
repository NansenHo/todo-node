const program = require('commander')
const api = require('./index.js')

program
    .option('-x, --xxx', 'what the x')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const task = args.slice(0, -1).join(' ')
        api.add(task)
    });
program
    .command('clear')
    .description('clear all tasks')
    .action((...args) => {
        console.log('this is clear');
    });

program.parse(process.argv);