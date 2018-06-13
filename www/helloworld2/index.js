let http = require("http");

let server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World 2");
});

server.listen(process.env.NODE_PORT || 0, () => {
    console.log("App running at http://localhost:" + server.address().port);
});
