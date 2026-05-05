'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import City from './City'

type CityData = {
  id: number
  name: string
  population: number
  capital: boolean
  visited: boolean
  countryId: number
}

export default function Cities({ countryId }: { countryId: number }) {
  const [cities, setCities] = useState<CityData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/country/${countryId}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a: CityData, b: CityData) =>
          a.name.localeCompare(b.name)
        )
        setCities(sorted)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load cities')
        setLoading(false)
      })
  }, [countryId])

  const hasCapital = cities.some((c) => c.capital)

  function handleCityUpdate(updatedCity: CityData) {
    setCities((prev) =>
      prev.map((c) => (c.id === updatedCity.id ? updatedCity : c))
    )
    router.refresh()
  }

  function handleCityDelete(cityId: number) {
    setCities((prev) => prev.filter((c) => c.id !== cityId))
    router.refresh()
  }

  async function handleAddCity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = (formData.get('name') as string).trim()
    const population = parseInt(formData.get('population') as string)
    const capital = formData.get('capital') === 'on'

    if (!name || isNaN(population)) return

    const res = await fetch(`/api/country/${countryId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, population, capital }),
    })

    if (res.ok) {
      const newCity: CityData = await res.json()
      setCities((prev) =>
        [...prev, newCity].sort((a, b) => a.name.localeCompare(b.name))
      )
      form.reset()
      router.refresh()
    } else {
      const data = await res.json()
      alert(data.error || 'Failed to add city')
    }
  }

  if (loading) return <div className="p-5 text-gray-400 text-sm">Loading cities…</div>
  if (error) return <div className="p-5 text-red-500 text-sm">{error}</div>

  return (
    <div className="p-5">
      <div className="space-y-2 mb-5">
        {cities.map((city) => (
          <City
            key={city.id}
            city={city}
            onUpdate={handleCityUpdate}
            onDelete={handleCityDelete}
          />
        ))}
        {cities.length === 0 && (
          <p className="text-gray-400 text-sm py-2">No cities yet.</p>
        )}
      </div>

      <form
        onSubmit={handleAddCity}
        className="border-t border-gray-100 pt-4"
      >
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Add City</h3>
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Name</label>
            <input
              name="name"
              placeholder="City name"
              required
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-36"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Population</label>
            <input
              name="population"
              type="number"
              placeholder="Population"
              required
              min="0"
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-36"
            />
          </div>
          {!hasCapital && (
            <label className="flex items-center gap-1.5 text-sm text-gray-600 pb-1.5">
              <input name="capital" type="checkbox" className="w-4 h-4" />
              Capital
            </label>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Add City
          </button>
        </div>
      </form>
    </div>
  )
}
