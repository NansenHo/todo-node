const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const p = require('path') // node.js 提供的专门用来拼接路径的
const dbPath = p.join(home, '.todo')
const fs = require('fs')

module.exports.add = (task) => {
    fs.readFile(dbPath, {flag: 'a+'}, (error, data)=>{
        console.log(data.toString())
    })
}

