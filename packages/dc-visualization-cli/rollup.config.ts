import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

import builtins from 'builtin-modules'

import shebang from 'rollup-plugin-preserve-shebang'

const pkg = require('./package.json')

const libraryName = 'dc-visualization-cli'

export default {
  input: `src/${libraryName}.ts`,
  output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
  external: builtins,
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve({}),
    sourceMaps(),
    shebang({
      shebang: '#!/usr/bin/env node',
    }),
  ],
}
