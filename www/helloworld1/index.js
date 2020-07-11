const http = require('http')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(_.capitalize(`${process.env.HELLO} WORLD WITH NPM START!`))
})

server.listen(process.env.NODE_PORT, () => {
    console.log('App running at http://localhost:' + server.address().port);
})