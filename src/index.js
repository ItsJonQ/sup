const fs = require('fs')
const path = require('path')

const root = process.env.HOME
const rootDir = path.join(root, '.do')

const formatDate = date => date.toISOString().split('T')[0]

const getToday = () => formatDate(new Date())

const getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  return formatDate(date)
}

const formatFileFromDate = date => path.join(rootDir, `${date}.md`)

const fileExists = file => fs.existsSync(file)

const createDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
const createRootDir = () => createDir(rootDir)

const readFile = async file => {
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

const writeFile = async (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

const getFile = async file => {
  createRootDir()
  return await readFile(file)
}

const createFile = async file => {
  createRootDir()

  if (fileExists(file)) return

  return await writeFile(file, '')
}

const startToday = async () => {
  const file = formatFileFromDate(getToday())
  await createFile(file)
}

startToday()
