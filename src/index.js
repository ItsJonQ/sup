#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program.usage(`

SUP (v${pkg.version})
sup <command>

Example:
sup add`)

program.version(pkg.version)

program
  .command('add [task]')
  .alias('a')
  .description('Add a new task')
  .action(() => {
    console.log('adding...')
  })

program.parse(process.argv)

const NO_COMMAND_SPECIFIED = program.args.length === 0

if (NO_COMMAND_SPECIFIED) {
  program.help()
}
