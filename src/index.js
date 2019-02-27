#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const dones = require('./dones')

program.usage(`

✌️  SUP (v${pkg.version})

sup <command>

Example:
sup add "I did a thing!"`)

program.version(pkg.version)

program
  .command('add [task]')
  .alias('a')
  .description('Add a new task for Today')
  .action(async content => {
    if (!content) return

    dones.add(content)

    console.log(`Added "${content}!"`)
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
  .description("Print Yesterday's and Today's tasks. Copies to clipboard.")
  .action(async () => {
    const content = await dones.copyAndPrint()
    console.log(content)
  })

program.parse(process.argv)

const NO_COMMAND_SPECIFIED = program.args.length === 0

if (NO_COMMAND_SPECIFIED) {
  program.help()
}
