import Link from "next/link";

export default async function Regions() {
  const data = await fetch("https://restcountries.com/v3.1/all?fields=region", {
    cache: "force-cache",
  }).then((res) => res.json());

  const regions = data
    .map((country) => country.region)
    .filter((x, i, arr) => arr.indexOf(x) === i)
    .sort();

  return (
    <nav>
      {/* <nav style={{ backgroundColor: "red" }}> */}
      <ul className="flex flex-wrap gap-x-2 text-lg">
        {regions.map((region) => (
          <li key={region}>
            <Link
              className="hover:underline hover:text-amber-600"
              href={`/${encodeURI(region)}`}
            >
              {region}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
