import Link from "next/link";
// import Regions from "../page";

export default async function Subregions({ params, searchParams }) {
  const { region } = await params;
  const data = await fetch(
    `https://restcountries.com/v3.1/all?fields=region,subregion`,
    {
      cache: "force-cache",
    },
  ).then((res) => res.json());

  const subregions = data
    .filter((country) => country.region === region)
    .map((country) => country.subregion)
    .filter((subregion, index, self) => self.indexOf(subregion) === index)
    .sort();

  return (
    <>
      {/* <Regions></Regions> */}
      <nav>
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
      </nav>
    </>
  );
}

export async function generateStaticParams() {
  const data = await fetch(`https://restcountries.com/v3.1/all?fields=region`, {
    cache: "force-cache",
  }).then((res) => res.json());

  const regions = data
    .map((country) => country.region)
    .filter((region, index, self) => self.indexOf(region) === index)
    .sort();

  return regions.map((region) => ({ region }));
}

// [
//   { region: "Africa" },
//   { region: "Asia" },
//   { region: "Americas" },
//   { region: "Europe" },
//   { region: "Oceania" },
// ].map(params => Subregions({params}));
