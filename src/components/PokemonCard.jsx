export default function PokemonCard({ p, onOpen }) {
  const id = p.details ? p.details.id : (p.url?.split('/').filter(Boolean).pop())
  const img = p.details?.sprites?.other?.['official-artwork']?.front_default || p.details?.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const types = p.details?.types?.map(t => t.type.name) || []
  return (
    <div className="card flex flex-col items-center gap-3 text-center cursor-pointer hover:scale-[1.02] transition" onClick={() => onOpen(p)}>
      <div className="w-full flex justify-end opacity-60">#{String(id).padStart(3, '0')}</div>
      <img src={img} alt={p.name} className="poke-img" />
      <div className="font-semibold capitalize">{p.name}</div>
      <div className="flex gap-2">
        {types.map(t => <span key={t} className="badge capitalize">{t}</span>)}
      </div>
    </div>
  )
}

const typeColors = {
  plant: "bg-green-400 text-white",
  fire: "bg-red-400 text-white",
  water: "bg-blue-400 text-white",
};

function Badge({ type }) {
  const colorClass = typeColors[type] || "bg-gray-300 text-black";
  return <span className={`badge ${colorClass}`}>{type}</span>;
}