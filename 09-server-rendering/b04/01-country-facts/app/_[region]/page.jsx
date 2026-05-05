import Link from "next/link";

import Regions from "@/app/_page";

export default async function Subregions({ params }) {
  let { region } = await params;
  region = decodeURI(region);

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion",
    {
      cache: "force-cache",
    },
  ).then((res) => res.json());

  const subregions = data
    .filter((country) => country.region === region)
    .map((country) => country.subregion)
    .filter((x, i, arr) => arr.indexOf(x) === i)
    .sort();

  return (
    <>
      <Regions />
      <nav>
        {/* <nav style={{ backgroundColor: "red" }}> */}
        <ul className="flex flex-wrap gap-x-1.5 text-md">
          {subregions.map((subregion) => (
            <li key={subregion}>
              <Link
                className="hover:underline hover:text-amber-600"
                href={`/${encodeURI(region)}/${encodeURI(subregion)}`}
              >
                {subregion}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export async function generateStaticParams() {
  const data = await fetch("https://restcountries.com/v3.1/all?fields=region", {
    cache: "force-cache",
  }).then((res) => res.json());

  const regions = data
    .map((country) => country.region)
    .filter((x, i, arr) => arr.indexOf(x) === i)
    .sort();

  return regions.map((region) => ({ region }));
}

// [
//   { region: "Africa" },
//   { region: "Americas" },
//   { region: "Antractic" },
//   { region: "Asia" },
//   { region: "Europe" },
//   { region: "Oceania" },
// ].map(params => Subregions(params))
