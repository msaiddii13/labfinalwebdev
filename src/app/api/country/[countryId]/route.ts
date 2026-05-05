import { NextResponse } from 'next/server'
import { cityRepository } from '@/repositories/cityRepository'

export async function GET(
  _request: Request,
  { params }: { params: { countryId: string } }
) {
  try {
    const countryId = parseInt(params.countryId)
    if (isNaN(countryId)) {
      return NextResponse.json({ error: 'Invalid country id' }, { status: 400 })
    }
    const cities = await cityRepository.findByCountryId(countryId)
    return NextResponse.json(cities)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { countryId: string } }
) {
  try {
    const countryId = parseInt(params.countryId)
    if (isNaN(countryId)) {
      return NextResponse.json({ error: 'Invalid country id' }, { status: 400 })
    }
    const body = await request.json()
    const { name, population, capital } = body
    if (!name || population == null) {
      return NextResponse.json({ error: 'Missing required fields: name, population' }, { status: 400 })
    }
    const city = await cityRepository.create({
      name,
      population: Number(population),
      capital: Boolean(capital),
      countryId,
    })
    return NextResponse.json(city, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
