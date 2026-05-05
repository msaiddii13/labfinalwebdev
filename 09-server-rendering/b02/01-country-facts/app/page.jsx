import Link from "next/link";

export default async function Regions() {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region",
  ).then((res) => res.json());

  const regions = data
    .map((country) => country.region)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort();

  return (
    <div>
      <ul className="flex flex-wrap gap-x-2 text-lg">
        {regions.map((region) => (
          <li key={region}>
            <Link className="hover:underline" href={`/${encodeURI(region)}`}>
              {region}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
