const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})

process.on('unhandledRejection', (err: Error) => {
    console.log(err.name, err.message);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});