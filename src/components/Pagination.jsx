export default function Pagination({ skip, limit, total, onPageChange }) {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let p = start; p <= end; p++) pages.push(p);

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange((page - 1) * limit);
  };

  const btnBase = 'w-9 h-9 flex items-center justify-center font-mono text-sm transition-all duration-150 focus:outline-none';
  const btnActive = `${btnBase} bg-ink text-cream`;
  const btnInactive = `${btnBase} text-ink-muted border border-cream-deep hover:border-ink hover:text-ink`;
  const btnDisabled = `${btnBase} text-cream-deep border border-cream-dark cursor-not-allowed`;

  return (
    <div className="flex items-center justify-between">
      {/* Info */}
      <p className="font-mono text-xs text-ink-muted">
        Page {currentPage} of {totalPages} &nbsp;·&nbsp; {total} stories
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? btnDisabled : btnInactive}
          title="Previous page"
        >
          ←
        </button>

        {start > 1 && (
          <>
            <button onClick={() => goTo(1)} className={btnInactive}>1</button>
            {start > 2 && <span className="w-9 h-9 flex items-center justify-center text-ink-muted text-sm">…</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={p === currentPage ? btnActive : btnInactive}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="w-9 h-9 flex items-center justify-center text-ink-muted text-sm">…</span>}
            <button onClick={() => goTo(totalPages)} className={btnInactive}>{totalPages}</button>
          </>
        )}

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? btnDisabled : btnInactive}
          title="Next page"
        >
          →
        </button>
      </div>
    </div>
  );
}
