type CreateFn<T> = (creator: (set: (partial: Partial<T>) => void, get: () => T) => T) => {
  getState: () => T;
  setState: (partial: Partial<T>) => void;
  subscribe: (fn: (s: T) => void) => () => void;
};

import type { Note } from '../lib/notes';

// Try to conditionally load zustand if present; otherwise use shim.
// This avoids a hard dependency at build time to satisfy Vite resolver.
const loaders = import.meta.glob('../vendor/zustand-shim.ts');
async function loadCreate<T>(): Promise<CreateFn<T>> {
  try {
    const mod = await import('zustand') as unknown as { create: CreateFn<T> };
    return mod.create;
  } catch {
    const mod = (await loaders['../vendor/zustand-shim.ts']?.()) as unknown as { create: CreateFn<T> };
    return mod.create;
  }
}
const createImpl = await loadCreate<NotesState>();

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
  query: string;
  tagFilters: string[];
  categoryFilter: string | null;

  setNotes: (notes: Note[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
  select: (id: string | null) => void;
  setQuery: (q: string) => void;
  setTagFilters: (tags: string[]) => void;
  setCategoryFilter: (cat: string | null) => void;
}

export const useNotesStore = createImpl<NotesState>((set: (p: Partial<NotesState>) => void) => ({
  notes: [],
  loading: false,
  error: null,
  selectedId: null,
  query: '',
  tagFilters: [],
  categoryFilter: null,

  setNotes: (notes) => set({ notes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  select: (id) => set({ selectedId: id }),
  setQuery: (query) => set({ query }),
  setTagFilters: (tagFilters) => set({ tagFilters }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
}));
