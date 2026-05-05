export function handleApiError(error) {
  console.error(error?.message ?? error);

  if (
    error?.name === "PrismaClientValidationError" ||
    error?.code === "P2002" ||
    error?.code === "P2003"
  ) {
    return Response.json({ error: "Client error." }, { status: 400 });
  }

  if (error?.code === "P2025") {
    return Response.json({ error: "Not found." }, { status: 404 });
  }

  return Response.json({ error: "Server error." }, { status: 500 });
}
