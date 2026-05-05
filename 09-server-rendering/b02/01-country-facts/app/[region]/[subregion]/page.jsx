import Link from "next/link";

export default async function Subregions({ params }) {
  let { region, subregion } = await params;
  region = decodeURI(region);
  subregion = decodeURI(subregion);

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name",
  ).then((res) => res.json());

  const countries = data
    .filter(
      (country) => country.region === region && country.subregion === subregion,
    )
    .map((country) => country.name.common)
    .sort();

  return (
    <div>
      <ul className="flex flex-wrap gap-x-1">
        {countries.map((country) => (
          <li key={country}>
            <Link
              className="hover:underline"
              href={`/${encodeURI(region)}/${encodeURI(subregion)}/${encodeURI(country)}`}
            >
              {country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export async function generateStaticParams() {
//   const data = await fetch(
//     "https://restcountries.com/v3.1/all?fields=region,subregion",
//   ).then((res) => res.json());

//   const regions = data
//     .map((country) => country.region)
//     .filter((r, i, a) => a.indexOf(r) === i);

//   const subregions = data
//     .filter((country) => regions.includes(country.region))
//     .map((country) => country.subregion)
//     .filter((s, i, a) => a.indexOf(s) === i);

//   const params = [];
//   for (const region of regions) {
//     for (const subregion of subregions) {
//       params.push({ region, subregion });
//     }
//   }

//   return params;
// }
