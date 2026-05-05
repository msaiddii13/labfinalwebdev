import { prisma } from '@/lib/prisma'

export const cityRepository = {
  async findByCountryId(countryId: number) {
    const country = await prisma.country.findUnique({ where: { id: countryId } })
    if (!country) throw new Error(`Country with id ${countryId} not found`)
    return prisma.city.findMany({
      where: { countryId },
      orderBy: { name: 'asc' },
    })
  },

  async findById(id: number) {
    const city = await prisma.city.findUnique({ where: { id } })
    if (!city) throw new Error(`City with id ${id} not found`)
    return city
  },

  async create(data: { name: string; population: number; capital: boolean; countryId: number }) {
    const country = await prisma.country.findUnique({ where: { id: data.countryId } })
    if (!country) throw new Error(`Country with id ${data.countryId} not found`)

    if (data.capital) {
      const existingCapital = await prisma.city.findFirst({
        where: { countryId: data.countryId, capital: true },
      })
      if (existingCapital) throw new Error(`Country '${country.name}' already has a capital city`)
    }

    return prisma.city.create({ data })
  },

  async update(id: number, data: Partial<{ visited: boolean; name: string; population: number; capital: boolean }>) {
    const city = await prisma.city.findUnique({ where: { id } })
    if (!city) throw new Error(`City with id ${id} not found`)
    return prisma.city.update({ where: { id }, data })
  },

  async delete(id: number) {
    const city = await prisma.city.findUnique({ where: { id } })
    if (!city) throw new Error(`City with id ${id} not found`)
    if (!city.visited) throw new Error('Only visited cities can be removed')
    return prisma.city.delete({ where: { id } })
  },
}
