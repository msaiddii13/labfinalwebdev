import * as users from "@/repos/users.js";

export async function GET(request) {
  try {
    return Response.json(await users.read());
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
