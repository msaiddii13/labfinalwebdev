import * as users from "@/repos/users";

export async function GET() {
  try {
    return Response.json(await users.read());
  } catch (e) {
    console.error(e.message);
    return Response.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const user = await users.create(data);
    return Response.json(user, { status: 201 });
  } catch (e) {
    console.error(e.message);
    return Response.json({ message: "Server error." }, { status: 500 });
  }
}
