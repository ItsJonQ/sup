# ✌️ SUP

> Simple task tracker

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
- [Configure](#configure)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

```
✌️  SUP

sup <command>

Example:
  sup add "I did a thing!"

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  config [options]  Configures SUP
  add|a [task]      Add a new task for Today
  list|ls           List Today's tasks
  edit|e            Edit Today's tasks
  print|p           Print Yesterday's and Today's tasks
  copy|cp           Copy Yesterday's and Today's tasks
  open|o            Opens the task directory
  which             Display location of tasks
```

## Configure

By default, Do will create `.md` files under the `~/.sup` directory. You can customize the directory by running:

```
sup config --dir=~/Stuff/my-custom-do/here
```
