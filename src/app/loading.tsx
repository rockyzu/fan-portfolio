export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-live="polite" aria-busy="true">
      <p className="text-neutral-500">Loading…</p>
    </div>
  );
}
