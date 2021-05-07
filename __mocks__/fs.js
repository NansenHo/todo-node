const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs') // _fs 是真正的 fs

Object.assign(fs, _fs)

const readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in readMocks) {
        callback(...readMocks[path]) // error 和 data
    } else {
        _fs.readFile(path, options, callback)
    }
}

const writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in writeMocks) {
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}

module.exports = fs
