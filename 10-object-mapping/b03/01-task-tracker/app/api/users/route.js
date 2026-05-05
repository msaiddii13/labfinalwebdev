import * as users from "@/repos/users";

export async function GET(request) {
  try {
    return Response.json(await users.read());
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    return Response.json(await users.create(body), { status: 201 });
  } catch (e) {
    console.error(e);

    if (e.name === "PrismaClientValidationError" || e.code === "P2002") {
      return Response.json({ error: "Client error." }, { status: 400 });
    }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
