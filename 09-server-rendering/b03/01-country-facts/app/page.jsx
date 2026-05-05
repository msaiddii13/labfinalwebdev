import Link from "next/link";

export default async function Regions({ params, searchParams }) {
  const data = await fetch(`https://restcountries.com/v3.1/all?fields=region`, {
    cache: "force-cache",
  }).then((res) => res.json());

  const regions = data
    .map((country) => country.region)
    .filter((region, index, self) => self.indexOf(region) === index)
    .sort();

  return (
    // <nav style={{ backgroundColor: "red" }}>
    <nav>
      <ul className="flex flex-wrap gap-x-2 text-lg">
        {regions.map((region) => (
          <li key={region}>
            <Link className="hover:underline" href={`/${encodeURI(region)}`}>
              {region}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Regions()
