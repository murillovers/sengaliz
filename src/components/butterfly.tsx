export function Butterfly({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 34c-4-10-12-16-20-14-2 6 0 14 6 18 5 3 10 3 14 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 34c4-10 12-16 20-14 2 6 0 14-6 18-5 3-10 3-14 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 34c-3 4-6 10-6 16 3 1 6 1 8 0-1-6-2-11-2-16Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="46" cy="18" r="1" fill="currentColor" />
      <circle cx="52" cy="24" r="0.6" fill="currentColor" />
      <circle cx="42" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function ButterflyDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-16" aria-hidden="true">
      <span className="h-px w-16 bg-[color:var(--gold)]/40 md:w-32" />
      <Butterfly className="h-5 w-5 text-[color:var(--gold)]" />
      <span className="h-px w-16 bg-[color:var(--gold)]/40 md:w-32" />
    </div>
  );
}
