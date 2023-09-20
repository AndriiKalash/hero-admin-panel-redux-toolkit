const jsoServer = require('json-server');
const server = jsoServer.create();
const router =jsoServer.router(('./heroes.json'));
const middlewares = jsoServer.defaults({
    static: './build',
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
    console.log('Server is running');
});