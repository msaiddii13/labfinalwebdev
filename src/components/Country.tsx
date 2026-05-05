import Cities from './Cities'

type CityAgg = { id: number; visited: boolean }

type CountryData = {
  id: number
  name: string
  population: number
  area: number
  _count: { cities: number }
  cities: CityAgg[]
}

export default function Country({ country }: { country: CountryData }) {
  const totalCities = country._count.cities
  const visitedCities = country.cities.filter((c) => c.visited).length

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white">
        <h2 className="text-2xl font-bold mb-1">{country.name}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-blue-100 mt-2">
          <span>Population: {country.population.toLocaleString()}</span>
          <span>Area: {country.area.toLocaleString()} km²</span>
        </div>
        <div className="flex gap-3 mt-3">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
            {totalCities} {totalCities === 1 ? 'city' : 'cities'}
          </span>
          <span className="bg-green-400/30 px-3 py-1 rounded-full text-xs font-medium">
            {visitedCities} visited
          </span>
        </div>
      </div>
      <Cities countryId={country.id} />
    </div>
  )
}
