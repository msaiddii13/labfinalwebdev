import { handleApiError } from "@/app/api/utils";
import * as accounts from "@/repos/accounts";

export async function GET(_request, { params }) {
  try {
    const { account } = await params;
    const data = await accounts.read(account);

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
    const { account } = await params;
    const data = await request.json();
    return Response.json(await accounts.update(account, data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { account } = await params;
    await accounts.remove(account);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
