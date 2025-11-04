const isDev = process.env.NODE_ENV !== 'production';

export const log = (...args) => {
  if (isDev) console.log(...args);
};

export const info = (...args) => {
  if (isDev) console.info(...args);
};

export const warn = (...args) => {
  if (isDev) console.warn(...args);
};

export const error = (...args) => {
  console.error(...args);
};

export default { log, info, warn, error };
