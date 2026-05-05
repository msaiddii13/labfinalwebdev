'use client'

type CityData = {
  id: number
  name: string
  population: number
  capital: boolean
  visited: boolean
  countryId: number
}

type Props = {
  city: CityData
  onUpdate: (city: CityData) => void
  onDelete: (cityId: number) => void
}

export default function City({ city, onUpdate, onDelete }: Props) {
  async function handleToggleVisited() {
    const res = await fetch(`/api/country/${city.countryId}/${city.id}`, {
      method: 'PATCH',
    })
    if (res.ok) {
      const updatedCity: CityData = await res.json()
      onUpdate(updatedCity)
    }
  }

  async function handleDelete() {
    const res = await fetch(`/api/country/${city.countryId}/${city.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      onDelete(city.id)
    } else {
      const data = await res.json()
      alert(data.error || 'Failed to delete city')
    }
  }

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm ${
        city.capital
          ? 'border-yellow-300 bg-yellow-50'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        {city.capital && (
          <span className="text-yellow-700 text-xs font-bold bg-yellow-100 px-2 py-0.5 rounded-full">
            ★ Capital
          </span>
        )}
        <span className="font-semibold text-gray-800">{city.name}</span>
        <span className="text-gray-400 text-xs">
          {city.population.toLocaleString()} people
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            city.visited
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {city.visited ? '✓ Visited' : 'Not visited'}
        </span>
      </div>

      <div className="flex gap-1.5 ml-2">
        <button
          onClick={handleToggleVisited}
          className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
            city.visited
              ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {city.visited ? 'Unvisit' : 'Visit'}
        </button>
        {city.visited && (
          <button
            onClick={handleDelete}
            className="text-xs px-3 py-1 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
