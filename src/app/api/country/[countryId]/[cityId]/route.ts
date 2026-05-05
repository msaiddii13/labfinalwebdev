import { NextResponse } from 'next/server'
import { cityRepository } from '@/repositories/cityRepository'

export async function PATCH(
  _request: Request,
  { params }: { params: { countryId: string; cityId: string } }
) {
  try {
    const cityId = parseInt(params.cityId)
    if (isNaN(cityId)) {
      return NextResponse.json({ error: 'Invalid city id' }, { status: 400 })
    }
    const city = await cityRepository.findById(cityId)
    const updated = await cityRepository.update(cityId, { visited: !city.visited })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { countryId: string; cityId: string } }
) {
  try {
    const cityId = parseInt(params.cityId)
    if (isNaN(cityId)) {
      return NextResponse.json({ error: 'Invalid city id' }, { status: 400 })
    }
    await cityRepository.delete(cityId)
    return NextResponse.json({ message: 'City deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
