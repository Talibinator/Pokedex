export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null
  const img = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative max-w-3xl w-full card grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="absolute top-3 right-3" onClick={onClose}>✕</button>
        <div className="flex flex-col items-center justify-center gap-3">
          <img src={img} alt={pokemon.name} className="w-48 h-48 object-contain" />
          <div className="text-2xl font-bold capitalize">{pokemon.name} <span className="opacity-60 text-sm">#{String(pokemon.id).padStart(3,'0')}</span></div>
          <div className="flex gap-2">
            {pokemon.types.map(t => <span key={t.type.name} className="badge capitalize">{t.type.name}</span>)}
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="font-semibold">Stats</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pokemon.stats.map(s => (
                <div key={s.stat.name} className="card flex items-center justify-between">
                  <div className="capitalize">{s.stat.name}</div>
                  <div className="font-semibold">{s.base_stat}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold">Abilities</div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {pokemon.abilities.map(a => <span key={a.ability.name} className="badge capitalize">{a.ability.name}</span>)}
            </div>
          </div>
          <div>
            <div className="font-semibold">Moves (sample)</div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {pokemon.moves.slice(0,8).map(m => <span key={m.move.name} className="badge lowercase">{m.move.name}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
