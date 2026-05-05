import Link from "next/link";

export default async function Subregions({ children, params }) {
  const { region } = await params;

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=subregion,region",
  ).then((res) => res.json());

  const subregions = data
    .filter((r) => r.region === decodeURI(region))
    .map((r) => r.subregion)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort();

  return (
    <>
      <div className="flex flex-wrap gap-x-1.5 mb-2">
        {subregions.map((subregion) => (
          <Link
            className="hover:underline text-lg"
            key={subregion}
            href={`/${encodeURI(region)}/${encodeURI(subregion)}`}
          >
            {subregion}
          </Link>
        ))}
      </div>
      {children}
    </>
  );
}

export async function generateStaticParams() {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region",
  ).then((res) => res.json());

  const regions = data
    .map((r) => r.region)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort();

  return regions.map((region) => ({
    region,
  }));
}
