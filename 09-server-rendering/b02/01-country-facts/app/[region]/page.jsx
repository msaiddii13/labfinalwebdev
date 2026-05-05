import Link from "next/link";

export default async function Subregions({ params }) {
  let { region } = await params;
  region = decodeURI(region);

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion",
  ).then((res) => res.json());

  const subregions = data
    .filter((country) => country.region === region)
    .map((country) => country.subregion)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort();

  return (
    <div>
      <ul className="flex flex-wrap gap-x-1.5 text-md">
        {subregions.map((subregion) => (
          <li key={subregion}>
            <Link
              className="hover:underline"
              href={`/${encodeURI(region)}/${encodeURI(subregion)}`}
            >
              {subregion}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region",
  ).then((res) => res.json());

  const regions = data
    .map((country) => country.region)
    .filter((r, i, a) => a.indexOf(r) === i);

  return regions.map((region) => ({ region }));
}

// [
//   { region: "Africa"},
//   { region: "Americas"},
//   ...
// ]
