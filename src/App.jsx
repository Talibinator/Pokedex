import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import PokemonCard from './components/PokemonCard.jsx'
import PokemonModal from './components/PokemonModal.jsx'
import Pagination from './components/Pagination.jsx'
import { listPokemon, getPokemonByNameOrId } from './services/pokeApi.js'

const PAGE_SIZE = 24

// Main App component
export default function App() {
  // State variables
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [listData, setListData] = useState({ results: [], count: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [detailedCache, setDetailedCache] = useState({})

  // Fetch the initial list of Pokémon
  useEffect(() => {
    fetchList()
  }, [page])

  // Fetch the list of Pokémon
  async function fetchList() {
    setLoading(true); setError('')
    try {
      const data = await listPokemon(page*PAGE_SIZE, PAGE_SIZE)
      setListData(data)
      data.results.forEach(r => {
        if (!detailedCache[r.name]) {
          getPokemonByNameOrId(r.name).then(d => setDetailedCache(c => ({...c,[r.name]:d}))).catch(()=>{})
        }
      })
    } catch (e) {
      setError(e.message || 'Failed to load list')
    } finally {
      setLoading(false)
    }
  }

  // Search for a Pokémon by name or ID
  async function doSearch() {
    if (!query) { fetchList(); return }
    setLoading(true); setError('')
    try {
      const data = await getPokemonByNameOrId(query)
      setListData({ results: [{ name: data.name, url: '' }], count: 1 })
      setDetailedCache(c => ({...c, [data.name]: data}))
    } catch (e) {
      setError('Not found. Check name or number.')
    } finally {
      setLoading(false)
    }
  }

  // Open the Pokémon details modal
  function openPokemon(p) {
    const name = p.name
    const cached = detailedCache[name]
    if (cached) { setSelected(cached); return }
    setLoading(true)
    getPokemonByNameOrId(name).then(d => { setDetailedCache(c => ({...c,[name]:d})); setSelected(d) }).catch(e => setError('Failed to load details')).finally(()=>setLoading(false))
  }

  const gridItems = useMemo(() => listData.results.map(r => ({...r, details: detailedCache[r.name]})), [listData, detailedCache])

  // Render the main app layout
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pokédex</h1>
          <div className="opacity-70">Powered by <a className="underline" href="https://pokeapi.co" target="_blank">PokeAPI</a></div>
        </header>

        <SearchBar value={query} setValue={setQuery} onSearch={doSearch} />

        {error && <div className="card text-rose-700">{error}</div>}
        {loading && <div className="card">Loading...</div>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {gridItems.map(p => <PokemonCard key={p.name} p={p} onOpen={openPokemon} />)}
        </div>

        <Pagination page={page} setPage={setPage} total={listData.count} pageSize={PAGE_SIZE} />

        <footer className="text-center opacity-70">Tip: click a card to view details. Try searching by name or Pokédex number.</footer>
      </div>

      {selected && <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
