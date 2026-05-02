import http from "node:http";
import { router } from "./src/router.js";

const server = http.createServer(router);

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
}); 