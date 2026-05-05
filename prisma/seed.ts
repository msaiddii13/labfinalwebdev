import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.city.deleteMany()
  await prisma.country.deleteMany()

  const japan = await prisma.country.create({
    data: {
      name: 'Japan',
      population: 125700000,
      area: 377975,
      cities: {
        create: [
          { name: 'Tokyo', population: 13960000, capital: true, visited: true },
          { name: 'Osaka', population: 2691185, capital: false, visited: true },
          { name: 'Kyoto', population: 1452000, capital: false, visited: false },
        ],
      },
    },
  })

  const italy = await prisma.country.create({
    data: {
      name: 'Italy',
      population: 59550000,
      area: 301340,
      cities: {
        create: [
          { name: 'Rome', population: 2873000, capital: true, visited: true },
          { name: 'Milan', population: 1378000, capital: false, visited: false },
          { name: 'Florence', population: 382258, capital: false, visited: false },
        ],
      },
    },
  })

  console.log(`Seeded: ${japan.name}, ${italy.name}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
