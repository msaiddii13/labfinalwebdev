import * as repo from "@/repo/tasks";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await repo.get(id);

    if (!data) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    return Response.json(data); //, {status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  // find it first, if not found return 404
  // if found, update it and return 200 with the updated task
}

export async function DELETE(request, { params }) {
  // find it first, if not found return 404
  // if found, delete it and return 204 no content
}
