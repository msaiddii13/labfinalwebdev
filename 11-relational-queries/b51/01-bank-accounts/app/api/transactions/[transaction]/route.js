import { handleApiError } from "@/app/api/utils";
import * as transactions from "@/repos/transactions";

export async function GET(_request, { params }) {
  try {
    const { transaction } = await params;
    const data = await transactions.read(transaction);

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
    const { transaction } = await params;
    const data = await request.json();
    return Response.json(await transactions.update(transaction, data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { transaction } = await params;
    await transactions.remove(transaction);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
