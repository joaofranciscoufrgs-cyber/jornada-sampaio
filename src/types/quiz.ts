export type QuizOption = {
  id: string;
  text: string;
  correct?: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  context?: string;
  options: QuizOption[];
  section: string;
};

export type QuizSession = {
  currentQuestionId: string | null;
  revealed: boolean;
  participants: Map<string, Participant>;
  answers: Map<string, Map<string, string>>;
};

export type Participant = {
  id: string;
  name: string;
  joinedAt: number;
  score: number;
};

export type ServerToClientEvents = {
  state: (payload: SerializedState) => void;
  question: (q: QuizQuestion | null) => void;
  revealed: (data: { questionId: string; tally: Record<string, number>; correct?: string }) => void;
  joined: (participant: Participant) => void;
};

export type ClientToServerEvents = {
  join: (name: string, ack: (p: Participant) => void) => void;
  answer: (data: { questionId: string; optionId: string }) => void;
  hostShowQuestion: (questionId: string | null) => void;
  hostReveal: (questionId: string) => void;
  hostReset: () => void;
  hostState: (ack: (s: SerializedState) => void) => void;
};

export type SerializedState = {
  currentQuestionId: string | null;
  revealed: boolean;
  participants: Participant[];
  tally: Record<string, number>;
};
