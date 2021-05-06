const db = require("../db.js")
const fs = require("fs")
jest.mock('fs')

describe("db", ()=>{
    it("can read", async ()=>{
        fs.setMock('/xxx', null, JSON.stringify([{title:"hi", done: false}]))
        const list = await db.read("/xxx")
        expect(list).toStrictEqual([]) // 要对比两个对象要用 toStrictEqual
    })
})

