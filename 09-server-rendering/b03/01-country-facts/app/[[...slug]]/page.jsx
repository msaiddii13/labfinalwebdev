export default async function Page({ params, searchParams }) {
  const { region, subregion, country } = await params;

  if (region) {
    if (subregion) {
      if (country) {
      }
    }
  }

  return (
    <>
      <p>Regions</p>
      {region && <p>Subregions</p>}
      {subregion && <p>Countries</p>}
      {country && <p>Facts</p>}
    </>
  );
}

// Page() -> regions
// Page({{params: {region: "Africa"}}}) -> regions + subregions
// Page({{params: {region: "Africa", subregion: "Northern Africa"}}}) -> regions + subregions + countries
// Page({{params: {region: "Africa", subregion: "Northern Africa", country: "Egypt"}}}) -> regions + subregions + countries + facts
