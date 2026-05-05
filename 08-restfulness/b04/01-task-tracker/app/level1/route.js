export async function GET(request, { params }) {
  // const value = request.nextUrl.searchParams.get("sortby");
  const value = new URL(request.url).searchParams.get("sortby");
  return Response.json({ message: `Hello ${value}!` });
}
