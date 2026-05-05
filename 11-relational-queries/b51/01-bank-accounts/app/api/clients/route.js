import { handleApiError } from "@/app/api/utils";
import * as clients from "@/repos/clients";

export async function GET() {
  try {
    return Response.json(await clients.read());
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    return Response.json(await clients.create(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
