// Dev-only logger for the frontend (Vite)
export const log = (...args) => {
  if (import.meta.env.MODE !== 'production') {
    console.log(...args);
  }
};

export default { log };
