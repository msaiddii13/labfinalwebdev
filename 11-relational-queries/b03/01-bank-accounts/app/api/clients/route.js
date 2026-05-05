import * as clients from "@/repos/clients";

export async function GET(request) {
  try {
    return Response.json(await clients.read());
  } catch (e) {
    // if (e.name === "??") { }
    // if (e.code === "??") { }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();
}
