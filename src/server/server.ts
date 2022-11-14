const http = require('http')
const server = http.createServer();
const port = 3000;

const io = require('socket.io')(server,
    {
        cors: {
            origin:"*"
        }
    }
);


io.on('connection', (socket: any) => {
    console.log('a user has connected')

});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});