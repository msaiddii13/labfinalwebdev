export default async function Facts({ params }) {
  const { region, subregion, country } = await params;
  return `Facts about ${decodeURI(country)}, in ${decodeURI(subregion)}, ${decodeURI(region)}`;
}
