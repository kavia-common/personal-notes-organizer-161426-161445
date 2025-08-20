export default function dayjs(input?: string | number | Date) {
  const d = input ? new Date(input) : new Date();
  return {
    toISOString: () => d.toISOString(),
    format: (_fmt: string) => {
      // Very minimal formatting stub: return ISO if unknown
      try {
        return d.toISOString();
      } catch {
        return String(d);
      }
    },
  };
}
