import * as tasks from "@/repos/tasks";

export async function GET() {
  try {
    return Response.json(await tasks.read());
  } catch (e) {
    console.error(e.message);
    return Response.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const task = await tasks.create(data);
    return Response.json(task, { status: 201 });
  } catch (e) {
    console.error(e.message);

    if (e.code === "P2002") {
      return Response.json({ message: "Client error." }, { status: 401 });
    }
    if (e.name === "PrismaClientValidationError") {
      return Response.json({ message: "Client error." }, { status: 400 });
    }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
