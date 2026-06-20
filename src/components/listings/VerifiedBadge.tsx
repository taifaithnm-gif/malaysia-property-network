type VerifiedBadgeProps = {
  label: string;
  onsiteLabel?: string;
  verifiedDate?: string;
  compact?: boolean;
};

export function VerifiedBadge({ label, onsiteLabel, verifiedDate, compact }: VerifiedBadgeProps) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        {label}
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-sm font-semibold text-white">
          {label}
        </span>
        {onsiteLabel && (
          <span className="text-sm font-medium text-emerald-800">{onsiteLabel}</span>
        )}
      </div>
      {verifiedDate && (
        <p className="mt-2 text-sm text-emerald-900">
          {verifiedDate}
        </p>
      )}
    </div>
  );
}
