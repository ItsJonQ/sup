const fs = require('fs')
const path = require('path')

const root = process.env.HOME
const rootDir = path.join(root, '.sup')

exports.root = root
exports.rootDir = rootDir

// https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time
exports.convertUTCDateToLocalDate = date => {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  )
  const offset = date.getTimezoneOffset() / 60
  const hours = date.getHours()

  newDate.setHours(hours - offset)

  return newDate
}

exports.formatDate = date => {
  const localDate = exports.convertUTCDateToLocalDate(date)

  return localDate.toISOString().split('T')[0]
}

exports.getToday = () => exports.formatDate(new Date())

exports.getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  return exports.formatDate(date)
}

exports.formatFileFromDate = date => path.join(rootDir, `${date}.md`)

exports.createDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
exports.createRootDir = () => exports.createDir(rootDir)

exports.readFile = async file => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(file)) {
      reject()
    }
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

exports.writeFile = async (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

exports.getFile = async file => {
  exports.createRootDir()
  return await exports.readFile(file)
}

exports.createFile = async file => {
  exports.createRootDir()

  if (fs.existsSync(file)) return

  return await exports.writeFile(file, '')
}
