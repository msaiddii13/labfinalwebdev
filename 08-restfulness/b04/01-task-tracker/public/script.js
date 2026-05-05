document.addEventListener("DOMContentLoaded", async () => {
  // const res = await fetch("/");
  // const data = await res.json();
  // console.log(data);

  const res = await fetch("/api/tasks");
  const data = await res.json();
  console.log(data);
});
