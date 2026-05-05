export default async function Home({ params, searchParams }) {
  const { path } = await params;
  const { name } = await searchParams;
  return (
    <>
      <p>You are at {path}!</p>
      {name && <p>Hello, {name}!</p>}
    </>
  );
}
