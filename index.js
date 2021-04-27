const program = require('commander')

program
    .option('-x, --xxx', 'what the x')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const task = args.slice(0, -1).join(' ')
        console.log(task);
    });

program.parse(process.argv);

console.log(program.xxx);