import { createCountry } from '@/app/actions'
import Country from './Country'

type CityAgg = { id: number; visited: boolean }

type CountryData = {
  id: number
  name: string
  population: number
  area: number
  _count: { cities: number }
  cities: CityAgg[]
}

export default function Countries({ countries }: { countries: CountryData[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Country</h2>
        <form action={createCountry} className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Name</label>
            <input
              name="name"
              placeholder="e.g. France"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-44"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Population</label>
            <input
              name="population"
              type="number"
              placeholder="e.g. 67000000"
              required
              min="0"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-44"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Area (km²)</label>
            <input
              name="area"
              type="number"
              placeholder="e.g. 551695"
              required
              min="0"
              step="0.01"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-44"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add Country
          </button>
        </form>
      </div>

      {countries.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No countries yet. Add one above!</p>
      ) : (
        countries.map((country) => <Country key={country.id} country={country} />)
      )}
    </div>
  )
}
