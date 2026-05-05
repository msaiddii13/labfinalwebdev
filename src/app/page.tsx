import { countryRepository } from '@/repositories/countryRepository'
import Countries from '@/components/Countries'

export default async function Home() {
  const countries = await countryRepository.findAll()

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Countries &amp; Cities</h1>
          <p className="text-gray-500 mt-1">Manage your travel collection</p>
        </div>
        <Countries countries={countries} />
      </div>
    </main>
  )
}
