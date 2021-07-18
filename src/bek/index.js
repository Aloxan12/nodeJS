let http = require('http');
const { usersController } = require('./usersControllers');

process.on('unhandledRejection', function(reason, p){
   console.log(reason, p); 
});
const cros = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false;
}

let server = http.createServer((req, res) => {
    console.log('some request');

    if (cros(req, res)) return;

    switch (req.url) {
        case "/users": usersController(req, res);
            break;
        case "/lessons":
            res.write('tasks');
            break;
        default:
            res.write('Page not found');
    }
});

server.listen(7645);