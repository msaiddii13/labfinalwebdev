import Link from "next/link";

export default async function Countries({ children, params }) {
  const { region, subregion } = await params;

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=subregion,region,name",
  ).then((res) => res.json());

  const countries = data
    .filter((r) => r.region === decodeURI(region))
    .filter((r) => r.subregion === decodeURI(subregion))
    .map((r) => r.name.common)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort();

  return (
    <>
      <div className="flex flex-wrap gap-x-1.5 mb-2">
        {countries.map((country) => (
          <Link
            className="hover:underline"
            key={country}
            href={`/${encodeURI(region)}/${encodeURI(subregion)}/${encodeURI(country)}`}
          >
            {country}
          </Link>
        ))}
      </div>
      {children}
    </>
  );
}

export async function generateStaticParams() {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion",
  ).then((res) => res.json());
}
