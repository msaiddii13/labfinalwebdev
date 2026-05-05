import * as clients from "@/repos/clients";

export async function GET(request) {
  try {
    return Response.json(await clients.read());
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
