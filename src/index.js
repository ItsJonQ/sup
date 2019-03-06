#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const argv = require('yargs').argv
const config = require('./config')
const dones = require('./dones')

program.usage(`

⭐️  SUP (v${pkg.version})

sup <command>

Example:
  sup add "I did a thing!"`)

program.version(pkg.version)

program
  .command('config')
  .option('show', 'Show config')
  .option('--dir', 'Define the (full) directory path to save tasks')
  .option('--editor', 'Define the editor to open tasks with')
  .description('Configures SUP')
  .action(async (cmd, opts) => {
    const { dir, editor } = argv

    if (dir) {
      await config.setDirectory(dir)
      console.log('Set directory as', dir)
      return
    }

    if (editor) {
      await config.setEditor(editor)
      console.log('Set editor as', editor)
      return
    }

    if (cmd === 'show') {
      console.log(await config.get())
      return
    }

    program.help()
  })

program
  .command('add [task]')
  .alias('a')
  .description('Add a new task for Today')
  .action(async content => {
    if (!content) return

    dones.add(content)

    console.log(`Added "${content}"`)
  })

program
  .command('new [task]')
  .alias('n')
  .description('Alias for "add"')
  .action(async content => {
    if (!content) return

    dones.add(content)

    console.log(`Added "${content}"`)
  })

program
  .command('list')
  .alias('ls')
  .description("List Today's tasks")
  .action(async () => {
    const content = await dones.getToday()

    console.log(content)
  })

program
  .command('edit')
  .alias('e')
  .description("Edit Today's tasks")
  .action(async () => {
    dones.editToday()
  })

program
  .command('print')
  .alias('p')
  .description("Print Previous's and Today's tasks")
  .action(async () => {
    const content = await dones.print()
    console.log(content)
  })

program
  .command('copy')
  .alias('cp')
  .description("Copy Previous's and Today's tasks")
  .action(async () => {
    const content = await dones.copyAndPrint()
    console.log(content)
  })

program
  .command('open')
  .alias('o')
  .description('Opens the task directory')
  .action(async () => {
    await dones.open()
  })

program
  .command('which')
  .description('Display location of tasks')
  .action(async () => {
    const dir = await dones.getDir()
    console.log(dir)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
