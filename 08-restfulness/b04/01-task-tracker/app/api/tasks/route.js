import * as repo from "@/repos/tasks";

export async function GET(request, { params }) {
  try {
    const tasks = await repo.get();
    const order = new URL(request.url).searchParams.get("sort");
    if (order === "asc") {
      tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "desc") {
      tasks.sort((a, b) => b.title.localeCompare(a.title));
    }

    return Response.json(tasks); //,{status: 200});
  } catch (e) {
    console.error(e.message);
    return Response.json({ error: "Oops!" }, { status: 500 });
  }
}

// fetch("/api/tasks", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ title: "Task X", completed: false }),
// })

export async function POST(request, { params }) {
  try {
    let data;
    try {
      data = await request.json();
    } catch (e) {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const task = await repo.add(data);
    return Response.json(task, { status: 201 });
  } catch (e) {
    console.error(e.message);
    return Response.json({ error: "Oops!" }, { status: 500 });
  }
}
