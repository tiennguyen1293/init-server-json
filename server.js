const jsonServer = require("json-server");

const getDb = require("./database.js");

const server = jsonServer.create();
const router = jsonServer.router(getDb());
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`)
});