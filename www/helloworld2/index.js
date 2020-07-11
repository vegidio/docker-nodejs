const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Hello ${process.env.WORLD} with direct script call!`)
})

server.listen(process.env.NODE_PORT, () => {
    console.log('App running at http://localhost:' + server.address().port);
})