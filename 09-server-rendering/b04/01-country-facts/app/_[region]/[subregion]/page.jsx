import Regions from "@/app/_[region]/page";
import Subregions from "@/app/_[region]/[subregion]/page";

import Link from "next/link";

export default async function Countries({ params }) {
  let { region, subregion } = await params;
  region = decodeURI(region);
  subregion = decodeURI(subregion);

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name",
    {
      cache: "force-cache",
    },
  ).then((res) => res.json());

  const countries = data
    .filter(
      (country) => country.region === region && country.subregion === subregion,
    )
    .map((country) => country.name.common)
    .sort();

  return (
    <>
      <Regions />
      {/* <Subregions params={{ region }} /> */}
      <nav>
        {/* <nav style={{ backgroundColor: "red" }}> */}
        <ul className="flex flex-wrap gap-x-1 text">
          {countries.map((country) => (
            <li key={country}>
              <Link
                className="hover:underline hover:text-amber-600"
                href={`/${encodeURI(region)}/${encodeURI(subregion)}/${encodeURI(country)}`}
              >
                {country}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

// export async function generateStaticParams() {
//   const data = await fetch(
//     "https://restcountries.com/v3.1/all?fields=region,subregion",
//     {
//       cache: "force-cache",
//     },
//   ).then((res) => res.json());

//   const regions = data
//     .map((country) => country.region)
//     .filter((x, i, arr) => arr.indexOf(x) === i)
//     .sort();

//   const subregions = data
//     .filter((country) => regions.includes(country.region))
//     .map((country) => ({
//       region: country.region,
//       subregion: country.subregion,
//     }))
//     .filter(
//       (x, i, arr) =>
//         arr.findIndex(
//           (y) => y.region === x.region && y.subregion === x.subregion,
//         ) === i,
//     )
//     .sort((a, b) => {
//       if (a.region < b.region) return -1;
//       if (a.region > b.region) return 1;
//       if (a.subregion < b.subregion) return -1;
//       if (a.subregion > b.subregion) return 1;
//       return 0;
//     });

//   return subregions.map(({ region, subregion }) => ({
//     region,
//     subregion,
//   }));
// }

// [
//   { region: "Africa" },
//   { region: "Americas" },
//   { region: "Antractic" },
//   { region: "Asia" },
//   { region: "Europe" },
//   { region: "Oceania" },
// ].map(params => Subregions(params))
