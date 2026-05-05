import * as repo from "@/repo/tasks";

export async function GET(request, { params }) {
  try {
    const data = await repo.get();
    // const order = request.nextUrl.searchParams.get("sort");
    const order = new URL(request.url).searchParams.get("sort");

    if (order === "asc") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "des") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const data = await repo.add(body);

    if ("error" in data) {
      return Response.json({ error: data.error }, { status: data.status });
    }
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
