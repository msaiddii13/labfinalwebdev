import { prisma } from '@/lib/prisma'

export const countryRepository = {
  async findAll() {
    return prisma.country.findMany({
      include: {
        _count: { select: { cities: true } },
        cities: { select: { id: true, visited: true } },
      },
      orderBy: { name: 'asc' },
    })
  },

  async findById(id: number) {
    const country = await prisma.country.findUnique({
      where: { id },
      include: {
        _count: { select: { cities: true } },
        cities: { select: { id: true, visited: true } },
      },
    })
    if (!country) throw new Error(`Country with id ${id} not found`)
    return country
  },

  async create(data: { name: string; population: number; area: number }) {
    try {
      return await prisma.country.create({ data })
    } catch (error: any) {
      if (error.code === 'P2002') throw new Error(`Country '${data.name}' already exists`)
      throw new Error('Failed to create country')
    }
  },
}
