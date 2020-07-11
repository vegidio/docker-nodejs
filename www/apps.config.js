module.exports = {
    apps: [{
        name: 'helloworld1',
        script: 'npm',
        args: 'start',
        cwd: '/var/www/helloworld1',
        watch: true,
        ignore_watch: ['node_modules', 'package-lock.json'],
        exec_mode: 'cluster',
        env: {
            HELLO: 'Hello'
        }
    }, {
        name: 'helloworld2',
        script: 'index.js',
        cwd: '/var/www/helloworld2',
        watch: true,
        ignore_watch: ['node_modules', 'package-lock.json'],
        exec_mode: 'cluster',
        env: {
            WORLD: 'World'
        }
    }]
}