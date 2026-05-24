import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { registerQuizSocket } from "./src/lib/quiz-server";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
    transports: ["websocket", "polling"],
  });

  registerQuizSocket(io);

  httpServer.listen(port, hostname, () => {
    console.log(`> Jornada Sampaio pronto em http://${hostname}:${port}`);
  });
});
