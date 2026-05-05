document.addEventListener("DOMContentLoaded", async () => {
  // const response = await fetch("/api/tasks", { method: "get" });
  // const data = await response.json();
  // console.log(data);

  const response = await fetch("/api/tasks", {
    method: "post",
    body: JSON.stringify({ title: "Task 1", completed: true }),
  });
  const data = await response.json();
  console.log(data);
});
