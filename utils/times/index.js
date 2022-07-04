#!/usr/bin/env node
const commands = require('./commands');

require('yargs')
  .scriptName('times')
  .usage('$0 <cmd> [args]')
  .command(commands.current)
  .command(commands.add)
  .command(commands.sub)
  .help().argv;
