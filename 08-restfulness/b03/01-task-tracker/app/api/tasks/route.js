import * as tasks from "@/repos/tasks";

export async function GET(request, { params }) {
  try {
    const data = await tasks.get();

    // const sort = request.nextUrl.searchParams.get("sort");
    const sort = new URL(request.url).searchParams.get("sort");
    if (sort === "asc") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "des") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }
    const param = new URL(request.url).searchParams.get("param");
    console.log(param);

    return Response.json(data); // , { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// fetch("/api/tasks", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "New Task",
//     completed: false,
//   }),
// });

export async function POST(request, { params }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return Response.json({ error: "Empty body" }, { status: 400 });
  }

  try {
    const task = await tasks.add(body);
    return Response.json(task, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
