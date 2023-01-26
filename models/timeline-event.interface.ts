export interface YearTimeline {
  year: number;
  highlights: { text: () => JSX.Element; subtext?: string; type?: HighlighType[] }[];
}

export enum HighlighType {
  Professional,
  Lucky,
  Achievement,
}
