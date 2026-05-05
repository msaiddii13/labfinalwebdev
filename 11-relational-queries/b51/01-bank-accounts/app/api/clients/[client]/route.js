import { handleApiError } from "@/app/api/utils";
import * as clients from "@/repos/clients";

export async function GET(_request, { params }) {
  try {
    const { client } = await params;
    const data = await clients.read(client);

    if (!data) {
      return Response.json({ error: "Not found." }, { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { client } = await params;
    const data = await request.json();
    return Response.json(await clients.update(client, data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { client } = await params;
    await clients.remove(client);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
