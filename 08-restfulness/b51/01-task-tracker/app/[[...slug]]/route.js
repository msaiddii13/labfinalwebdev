import { redirect } from "next/navigation";

export async function GET(request, { params }) {
  const { slug } = await params;
  if (!slug) {
    redirect("index.html");
  }

  return Response.json({ error: "Not found." }, { status: 404 });
}

export async function POST(request, { params }) {
  return Response.json({ error: "Not allowed." }, { status: 405 });
}

export async function PUT(request, { params }) {
  return Response.json({ error: "Not allowed." }, { status: 405 });
}

export async function PATCH(request, { params }) {
  return Response.json({ error: "Not allowed." }, { status: 405 });
}

export async function DELETE(request, { params }) {
  return Response.json({ error: "Not allowed." }, { status: 405 });
}
