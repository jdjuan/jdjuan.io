export const prevent =
  (fn?: any, ...args: any) =>
  (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    fn?.(...args);
  };
