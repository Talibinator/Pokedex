const BASE = 'https://pokeapi.co/api/v2'

export async function listPokemon(offset=0, limit=24) {
  const res = await fetch(`${BASE}/pokemon?offset=${offset}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to list Pokémon')
  return res.json()
}

export async function getPokemonByNameOrId(nameOrId) {
  const res = await fetch(`${BASE}/pokemon/${nameOrId.toString().toLowerCase()}`)
  if (!res.ok) throw new Error('Pokémon not found')
  return res.json()
}

export async function getSpecies(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Species fetch failed')
  return res.json()
}
