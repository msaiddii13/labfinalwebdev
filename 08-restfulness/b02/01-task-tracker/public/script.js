document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "New Task", completed: false }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }
});
