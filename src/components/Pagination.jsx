export default function Pagination({ page, setPage, total, pageSize }) {
  const last = Math.max(0, Math.ceil(total / pageSize) - 1)
  return (
    <div className="flex items-center gap-2 justify-center">
      <button className="btn" onClick={() => setPage(p => Math.max(0, p-1))} disabled={page<=0}>Prev</button>
      <div className="px-3">{page+1} / {last+1}</div>
      <button className="btn" onClick={() => setPage(p => Math.min(last, p+1))} disabled={page>=last}>Next</button>
    </div>
  )
}
