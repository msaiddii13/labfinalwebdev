import { handleApiError } from "@/app/api/utils";
import * as transactions from "@/repos/transactions";

export async function GET() {
  try {
    return Response.json(await transactions.read());
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    return Response.json(await transactions.create(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
