import { handleApiError } from "@/app/api/utils";
import * as accounts from "@/repos/accounts";

export async function GET() {
  try {
    return Response.json(await accounts.read());
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    return Response.json(await accounts.create(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
