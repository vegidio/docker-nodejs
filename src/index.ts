import * as fs from 'fs'
import * as express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from './logger'

const proxy = express()

// I know I'm using eval() here, but this is a situation where ONLY the server admin has control over the system. No
// external actors should have the power to control how the this docker image will be executed and what parameters will
// be passed to the ecosystem file. So, in theory, there's no risk to use eval() here because if someone has access to
// pass parameters to your containers then you have far bigger problems.
const content = fs.readFileSync(`${process.env.APPS_DIR}/apps.config.js`).toString('utf-8')
const ecosystem = eval(content)

// Initial port number
let port = 8080
const report: { name: string, path: string }[] = []

ecosystem.apps.forEach((app: any) => {
    // Determine the path
    const path = app.env.PATH_REWRITE || `/${process.env.APPS_PREFIX}/${app.name}`

    // Calculate the port for each app
    port += 1

    // Create friendly path to the app, without the port
    proxy.use(path, createProxyMiddleware({
        target: `http://0.0.0.0:${port}`,
        pathRewrite: { [`^${path}`]: '' },
        changeOrigin: true,
        logLevel: 'silent'
    }))

    report.push({
        name: app.name,
        path: path
    })
})

const isLogOn = process.env.LOG_LEVEL !== 'silent'

// Starting server
proxy.listen(80, () => {
    if (isLogOn) {
        logger.info('🤖 Reverse proxy running for the apps:')
        report.forEach(app => logger.info('- %s, path: http://localhost%s', app.name, app.path))
    }
})