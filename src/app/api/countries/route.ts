import { NextResponse } from 'next/server'
import { countryRepository } from '@/repositories/countryRepository'

export async function GET() {
  try {
    const countries = await countryRepository.findAll()
    return NextResponse.json(countries)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, population, area } = body
    if (!name || population == null || area == null) {
      return NextResponse.json({ error: 'Missing required fields: name, population, area' }, { status: 400 })
    }
    const country = await countryRepository.create({
      name,
      population: Number(population),
      area: Number(area),
    })
    return NextResponse.json(country, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
