const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const mkdirp = require('mkdirp')
const clipboard = require('clipboardy')
const emoji = require('node-emoji')
const {
  root,
  getToday,
  readFile,
  writeFile,
  getDateFromFileName,
} = require('./utils')
const config = require('./config')

const dirName = 'dones'

exports.getDir = async () => {
  const dirRoot = await config.getDirectory()
  const trueRoot = dirRoot.replace('~/', `${root}/`)
  const dir = path.join(trueRoot, dirName)

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }

  return dir
}

exports.getFiles = async () => {
  const dir = await exports.getDir()
  const files = fs.readdirSync(dir, (err, files) => {
    if (err) {
      return console.log(err)
    }
    return files
  })

  return files
}

exports.getFilePath = async date => {
  const file = `${date}.md`
  const dir = await exports.getDir()
  const filePath = path.join(dir, file)

  return filePath
}

exports.readFile = async date => {
  const filePath = await exports.getFilePath(date)
  if (!fs.existsSync(filePath)) {
    return ''
  }

  return readFile(filePath)
}

exports.add = async content => {
  const date = getToday()
  const filePath = await exports.getFilePath(date)
  const previousContent = await exports.getFileContent(filePath)

  const nextContent = previousContent
    ? `${previousContent.trim()}\n${content}`
    : content

  await writeFile(filePath, nextContent.trim())

  return nextContent
}

exports.getContentForDay = async ({ date, day, showEmpty }) => {
  const filePath = await exports.getFilePath(date)

  const emptyMessage = 'No tasks added yet!'
  const content = await exports.getFileContent(filePath)

  if (!showEmpty && !content) return ''

  return emoji.emojify(
    `*${day} (${date})*\n\n${content || emptyMessage}`,
    null,
    (code, name) => {
      return `${code} `
    },
  )
}

exports.getPreviousDate = async () => {
  const files = await exports.getFiles()

  const today = getToday()

  const previousRecentFile = files[files.length - 2]
  const previousRecentFileName = getDateFromFileName(previousRecentFile)

  const recentFile = files[files.length - 1]
  const recentFileName = getDateFromFileName(recentFile)

  const isRecentFileToday = recentFileName === today

  const date = isRecentFileToday ? previousRecentFileName : recentFileName

  return date
}

exports.getToday = async () => {
  return exports.getContentForDay({
    date: getToday(),
    day: 'Today',
    showEmpty: true,
  })
}

exports.getPrevious = async () => {
  const date = await exports.getPreviousDate()
  return exports.getContentForDay({
    date,
    day: 'Previous',
    showEmpty: true,
  })
}

exports.editToday = async () => {
  const date = getToday()
  const filePath = await exports.getFilePath(date)
  const editor = await config.getEditor()

  console.log('Opening', filePath, 'with', editor)
  const task = spawn(editor, [filePath], { stdio: 'inherit' })

  task.on('exit', () => {
    console.log('Done editing!')
  })
}

exports.print = async () => {
  const previous = await exports.getPrevious()
  const today = await exports.getToday()

  return [previous, today].filter(Boolean).join('\n\n')
}

exports.copyAndPrint = async () => {
  const content = await exports.print()
  clipboard.writeSync(content)

  return content
}

exports.getFileContent = async filePath => {
  let content = ''

  if (fs.existsSync(filePath)) {
    content = await readFile(filePath)
  }

  return content
}

exports.open = async () => {
  const dir = await exports.getDir()

  console.log('Opening', dir)
  spawn('open', [dir], { stdio: 'inherit' })
}

exports.dirName = dirName
