import * as tasks from "@/repos/tasks";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const task = await tasks.get(id);
    if (!task) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }
    return Response.json(task);
  } catch (e) {
    console.error(e.message);
    return Response.json({ error: "Oops!" }, { status: 500 });
  }
}
