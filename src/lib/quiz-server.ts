import type { Server } from "socket.io";

const ADMIN_ROOM = "admin";

export function registerQuizSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("admin:join", () => {
      socket.join(ADMIN_ROOM);
    });
    socket.on("admin:leave", () => {
      socket.leave(ADMIN_ROOM);
    });
  });

  global.__sampaioInscricoesNotify = () => {
    io.to(ADMIN_ROOM).emit("inscricoes:updated");
  };
}
