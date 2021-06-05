import nodeResolve from '@rollup/plugin-node-resolve'

export default [  
  {
    input: "adminIndex.js",
    output: {
      file: 'out/adminIndex.js',
      format: 'es',
      name: 'adminIndex'
    },
    plugins: [
      nodeResolve()
    ]
  }
]