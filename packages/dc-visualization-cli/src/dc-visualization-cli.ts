#!/usr/bin/env node

import { program } from 'commander'
import { build } from './build'

program.command('build').description('build visualization site').action(build)

program.parse(process.argv)
