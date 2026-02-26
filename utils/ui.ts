export const prevent =
  <Args extends unknown[]>(fn?: (...args: Args) => void, ...args: Args) =>
  (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
    fn?.(...args);
  };
