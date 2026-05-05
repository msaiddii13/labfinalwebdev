import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;
  if (!slug) {
    return;
  }

  if (slug.length > 3) {
    notFound();
  }

  // also check if region, subregion, country are valid

  const [region, subregion, country] = slug;

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name,capital,population,flags",
  ).then((res) => res.json());

  // show regions

  if (region) {
    // show subregion
  }

  if (subregion) {
    // show countries
  }

  if (country) {
    // show facts
  }

  return (
    <>
      {region && <h1 className="text-2xl font-bold">{region}</h1>}
      {subregion && <h2 className="text-xl font-semibold">{subregion}</h2>}
      {country && <h3 className="text-lg font-medium">{country}</h3>}
    </>
  );
}
