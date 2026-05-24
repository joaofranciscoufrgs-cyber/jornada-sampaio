import type { Server } from "socket.io";
import { randomUUID } from "node:crypto";
import { getQuestion } from "./data/quiz";
import type {
  ClientToServerEvents,
  Participant,
  SerializedState,
  ServerToClientEvents,
} from "@/types/quiz";

const state = {
  currentQuestionId: null as string | null,
  revealed: false,
  participants: new Map<string, Participant>(),
  // questionId -> (socketId -> optionId)
  answers: new Map<string, Map<string, string>>(),
};

function tallyFor(questionId: string | null): Record<string, number> {
  if (!questionId) return {};
  const byOption: Record<string, number> = {};
  const answersForQ = state.answers.get(questionId);
  if (!answersForQ) return {};
  for (const optionId of answersForQ.values()) {
    byOption[optionId] = (byOption[optionId] ?? 0) + 1;
  }
  return byOption;
}

function serialize(): SerializedState {
  return {
    currentQuestionId: state.currentQuestionId,
    revealed: state.revealed,
    participants: Array.from(state.participants.values()),
    tally: tallyFor(state.currentQuestionId),
  };
}

export function registerQuizSocket(
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  io.on("connection", (socket) => {
    socket.emit("state", serialize());

    socket.on("join", (name, ack) => {
      const participant: Participant = {
        id: socket.id,
        name: (name ?? "Cadete").slice(0, 40) || `Cadete-${randomUUID().slice(0, 4)}`,
        joinedAt: Date.now(),
        score: 0,
      };
      state.participants.set(socket.id, participant);
      ack?.(participant);
      io.emit("joined", participant);
      io.emit("state", serialize());
    });

    socket.on("answer", ({ questionId, optionId }) => {
      const q = getQuestion(questionId);
      if (!q) return;
      let answersForQ = state.answers.get(questionId);
      if (!answersForQ) {
        answersForQ = new Map();
        state.answers.set(questionId, answersForQ);
      }
      if (answersForQ.has(socket.id)) return;
      answersForQ.set(socket.id, optionId);
      io.emit("state", serialize());
    });

    socket.on("hostShowQuestion", (questionId) => {
      state.currentQuestionId = questionId;
      state.revealed = false;
      io.emit("question", getQuestion(questionId));
      io.emit("state", serialize());
    });

    socket.on("hostReveal", (questionId) => {
      const q = getQuestion(questionId);
      if (!q) return;
      state.revealed = true;
      const correct = q.options.find((o) => o.correct)?.id;
      if (correct) {
        const answersForQ = state.answers.get(questionId);
        if (answersForQ) {
          for (const [socketId, optionId] of answersForQ.entries()) {
            if (optionId === correct) {
              const p = state.participants.get(socketId);
              if (p) p.score += 1;
            }
          }
        }
      }
      io.emit("revealed", {
        questionId,
        tally: tallyFor(questionId),
        correct,
      });
      io.emit("state", serialize());
    });

    socket.on("hostReset", () => {
      state.currentQuestionId = null;
      state.revealed = false;
      state.answers.clear();
      for (const p of state.participants.values()) p.score = 0;
      io.emit("question", null);
      io.emit("state", serialize());
    });

    socket.on("hostState", (ack) => {
      ack(serialize());
    });

    socket.on("disconnect", () => {
      state.participants.delete(socket.id);
      io.emit("state", serialize());
    });
  });
}
