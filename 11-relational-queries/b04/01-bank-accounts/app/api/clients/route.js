import * as clients from "@/repos/clients";

export async function GET(request) {
  // fetch("/api/clients", {method: "GET"})

  action();

  try {
    return Response.json(await clients.read());
  } catch (e) {
    // if (e.code === ?) { }
    // if (e.name === ?) { }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

// client -> POST(data) -> fetch("/path", {method:"POST", body: JSON.stringify(data)})
// client -> serverFunction(args) (underneath: fetch())

// http://localhost:3000/api/client,POST(data)

export async function POST(request) {
  try {
    const data = await request.json();
    await clients.create(data);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
