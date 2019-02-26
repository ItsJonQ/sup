# SUP

> Stand up tracker

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
- [Configure](#configure)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

```
Usage: sup <command>

Commands:
config         Configures do
add    (a)     Add a new do
list   (ls)    List today's do's
edit   (e)     Edit today's do's (Vim)
print  (p)     Print yesterday's and today's do's
```

## Configure

By default, Do will create `.md` files under the `~/.sup` directory. You can customize the directory by running:

```
sup config --dir=~/Stuff/my-custom-do/here
```
