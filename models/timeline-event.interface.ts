import type { ReactNode } from "react";

export interface YearTimeline {
  year: number;
  highlights: { text: () => ReactNode; subtext?: string; type?: HighlighType[] }[];
}

export enum HighlighType {
  Professional,
  Lucky,
  Achievement,
}
