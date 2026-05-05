let _likes = 0;

export async function GET(request) {
  return Response.json({ likes: _likes });
}

export async function POST(request) {
  let { likes } = await request.json();
  _likes = likes;
  return Response.json({ likes: _likes });
}
