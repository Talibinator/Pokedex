import { Search } from 'lucide-react'

export default function SearchBar({ value, setValue, onSearch }) {
  return (
    <div className="flex gap-2 items-center w-full">
      <div className="flex-1 card flex items-center gap-2">
        <Search className="w-5 h-5 opacity-70" />
        <input
          className="search-input bg-transparent"
          placeholder="Search by name or Pokédex number (e.g., pikachu, 25)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
      <button className="badge" onClick={onSearch}>Search</button>
    </div>
  )
}
