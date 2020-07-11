const ecosystem = require('/var/www/apps.config')

// Inject the port in the apps
ecosystem.apps = ecosystem.apps.map((app, index) => {
    app.env = Object.assign(app.env || {}, { NODE_PORT: 8080 + index + 1 })
    return app
})

// Add the proxy to te execution list
ecosystem.apps.unshift({
    name: '__proxy__',
    script: 'proxy.js',
    cwd: '/var/proxy',
    exec_mode: 'cluster'
})

module.exports = ecosystem