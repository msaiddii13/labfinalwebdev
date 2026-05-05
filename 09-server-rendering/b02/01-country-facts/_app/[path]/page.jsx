export default async function Page({ params, searchParams }) {
  const { path } = await params;
  const { name } = await searchParams;
  return (
    <span className="font-serif">
      Fancy {path}
      {name ? ` ${name}` : ""}!
    </span>
  );
}
