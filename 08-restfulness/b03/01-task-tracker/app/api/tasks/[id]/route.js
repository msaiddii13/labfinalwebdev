import * as tasks from "@/repos/tasks";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await tasks.get(id);

    if (!data) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }
    return Response.json(data); // , { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await tasks.set(id, body);

    if (!data) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }
    return Response.json(data); // , { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const data = await tasks.remove(id);

    if (!data) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }
    return Response.json(data); // , { status: 204 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
