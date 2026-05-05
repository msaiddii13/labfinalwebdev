'use server'

import { revalidatePath } from 'next/cache'
import { countryRepository } from '@/repositories/countryRepository'

export async function createCountry(formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const population = parseInt(formData.get('population') as string)
  const area = parseFloat(formData.get('area') as string)

  if (!name || isNaN(population) || isNaN(area)) {
    throw new Error('Invalid form data: name, population, and area are required')
  }

  await countryRepository.create({ name, population, area })
  revalidatePath('/')
}
