import * as repo from "@/repo/tasks";

export async function GET(request) {
  const tasks = await repo.get();
  // const sorted = request.nextUrl.searchParams.get("sorted"); // query parameters
  const sorted = new URL(request.url).searchParams.get("sorted"); // query parameters

  if (sorted === "asc") {
    // tasks.sort((a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : +1));
    tasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sorted === "desc") {
    // tasks.sort((a, b) => (a.id > b.id ? -1 : a.id === b.id ? 0 : +1));
    tasks.sort((a, b) => b.title.localeCompare(a.title));
  }

  return Response.json(tasks, { status: 200 });

  // const response = await fetch();

  // const path = "repo/data/tasks.json";
  // return await Bun.file(path).json();
}

export async function POST(request) {
  // create task
  const data = await request.json();
  if (data?.title && data?.completed) {
    const task = await repo.add({
      title: data.title,
      completed: data.completed,
    });
    return Response.json(task, { status: 201 });
  }
  return Response.json({ error: "Bad request." }, { status: 400 });
  // return new Response("<html><body><p>Paragraph</p></body></html>")
}
