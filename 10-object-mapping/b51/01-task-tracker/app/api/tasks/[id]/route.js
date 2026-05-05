import * as tasks from "@/repos/tasks";

export async function GET(request, { params }) {
  const { id } = await params;
  console.log(id);

  try {
    const task = await tasks.read(id);
    if (!task) {
      return Response.json({ error: "Not found." }, { status: 404 });
    }
    return Response.json(task);
  } catch (e) {
    console.error(e.message);

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
