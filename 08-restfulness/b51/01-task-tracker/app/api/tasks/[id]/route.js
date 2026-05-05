import * as repo from "@/repo/tasks";

export async function GET(request, { params }) {
  const { id } = await params;
  // if (!id) {
  //   return Response.json({ error: "Bad request." }, { status: 400 });
  // } d

  const task = await repo.get(id);
  if (task) {
    return Response.json(task, { status: 200 });
  }
  return Response.json({ error: "Not found." }, { status: 404 });
}

export async function PUT(request, { params }) {
  // replace task with new one
  // but will set (patch) it instead

  const { id } = await params;
  // if (!id) {
  //   return Response.json({ error: "Bad request." }, { status: 400 });
  // }

  const data = await request.json();
  try {
    const task = await repo.set(id, data);
    return Response.json(task, { status: 201 });
  } catch (e) {
    if (e.message === "S100") {
      return Response.json({ error: `Bad request.` }, { status: 400 });
    } else if (e.message === "S101") {
      return Response.json({ error: `Not found.` }, { status: 404 });
    }
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  // remove the task with id

  const { id } = await params;
  // if (!id) {
  //   return Response.json({ error: "Bad request." }, { status: 400 });
  // }

  try {
    const task = await repo.remove(id);
    return Response.json(task, { status: 204 });
  } catch (e) {
    if (e.message === "S101") {
      return Response.json({ error: `Not found.` }, { status: 404 });
    }
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
