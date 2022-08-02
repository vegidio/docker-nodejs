import * as path from 'path'
import * as webpack from 'webpack'
import * as CopyPlugin from 'copy-webpack-plugin'

const config: webpack.Configuration = {
    target: 'node',
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd',
        filename: './proxy.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        // Comment out the lines below if you don't want to copy files to the build folder
        new CopyPlugin({ patterns: [
            { from: 'src/ecosystem.config.js', to: '.' }
        ]})
    ]
}

export default config