export const ValentineView = {
  Introduction: "Introduction",
  Question: "Question",
  Answer: "Answer",
} as const;

export type ValentineViewType =
  (typeof ValentineView)[keyof typeof ValentineView];
