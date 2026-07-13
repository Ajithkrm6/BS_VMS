/**
 * Simple logging utility
 */

interface Logger {
  log: (message: string, data?: unknown) => void;
  error: (message: string, error?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
  withTag: (tag: string) => Logger;
}

function createLogger(tags: string[] = []): Logger {
  const prefix = tags.length > 0 ? `[${tags.join('][')}] ` : '';

  return {
    log: (message: string, data?: unknown) => {
      console.log(`${prefix}${message}`, data);
    },
    error: (message: string, error?: unknown) => {
      console.error(`${prefix}${message}`, error);
    },
    warn: (message: string, data?: unknown) => {
      console.warn(`${prefix}${message}`, data);
    },
    info: (message: string, data?: unknown) => {
      console.info(`${prefix}${message}`, data);
    },
    debug: (message: string, data?: unknown) => {
      if (process.env.NODE_ENV === 'development') {
        console.debug(`${prefix}${message}`, data);
      }
    },
    withTag: (tag: string) => {
      return createLogger([...tags, tag]);
    },
  };
}

export const appLogger = createLogger();
