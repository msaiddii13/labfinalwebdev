document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/tasks");
    if (res.ok) {
      const json = await res.json();
      console.log(json);
    }
  } catch (e) {
    console.error(e.message);
  }

  try {
    const res = await fetch("/api/tasks/1");
    if (res.ok) {
      const json = await res.json();
      console.log(json);
    }
  } catch (e) {
    console.error(e.message);
  }
});
