export type StateCreator<T> = (set: (partial: Partial<T>) => void, get: () => T) => T;

// Minimal runtime shim if zustand is not present during build (not used when real package is installed)
export function create<T>(creator: StateCreator<T>) {
  let state = {} as T;
  const get = () => state;
  const set = (partial: Partial<T>) => { state = { ...state, ...partial }; };
  state = creator(set, get);
  return {
    getState: () => state,
    setState: set,
    // Subscription is a no-op in shim
    subscribe: (_fn: (s: T) => void) => {
      // Touch the fn to avoid unused warnings
      void _fn;
      return () => { /* noop */ };
    },
  } as unknown as {
    getState: () => T;
    setState: (partial: Partial<T>) => void;
    subscribe: (fn: (s: T) => void) => () => void;
  };
}
