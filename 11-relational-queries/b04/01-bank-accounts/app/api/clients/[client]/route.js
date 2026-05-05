import * as clients from "@/repos/clients";

export async function GET(request, { params }) {
  const { client } = await params;

  try {
    const data = await clients.read(client);

    if (!data) {
      return Response.json({ error: "Not found." }, { status: 404 });
    }

    return data;
  } catch (e) {
    // if (e.code === ?) { }
    // if (e.name === ?) { }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
