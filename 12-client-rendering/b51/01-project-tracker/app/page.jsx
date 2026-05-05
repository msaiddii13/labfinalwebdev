import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

import { Circle, CircleCheck } from "lucide-react";
import Task from "@/app/task";

export default async function Home() {
  const projects = await prisma.project.findMany({
    include: {
      tasks: true,
    },
  });

  const projectsCount = await prisma.project.count();

  const tasksCompleted = await prisma.task.aggregate({
    _count: { id: true },
    where: {
      completed: true,
    },
  });

  const tasksPerProject = await prisma.task.groupBy({
    by: ["project"],
    _count: { id: true },
  });

  const projectTaskCount = {};
  tasksPerProject.forEach((c) => {
    projectTaskCount[c.project] = c._count.id;
  });

  async function createProject(formData) {
    "use server";

    const title = formData.get("title");
    try {
      await prisma.project.create({
        data: {
          title,
        },
      });
      revalidatePath("/");
    } catch (e) {
      console.error(e.message);
    }
  }

  async function createTask(formData) {
    "use server";

    const title = formData.get("title");
    const project = formData.get("project");
    try {
      await prisma.task.create({
        data: {
          title,
          project,
        },
      });
      revalidatePath("/");
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="m-4">
      <div>{projectsCount}</div>
      <div>{tasksCompleted._count.id}</div>
      <ul className="border rounded p-2 grid gap-2 m-2">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <span>{project.title}</span>
                <span>[{projectTaskCount[project.id] ?? "0"}]</span>
              </div>
              <button className="btn btn-sm btn-circle">
                {project.completed ? (
                  <CircleCheck className="inline" size={18} />
                ) : (
                  <Circle className="inline" size={18} />
                )}
              </button>
            </div>
            <ul className="text-sm grid gap-1 mt-2">
              {project.tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  promise={prisma.task.findUnique({ where: { id: task.id } })}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <form action={createProject} className="flex gap-2 m-2">
        <input type="text" className="input" name="title" placeholder="Title" />
        <button className="btn btn-primary">Create</button>
      </form>
      <form action={createTask} className="flex gap-2 m-2">
        <input type="text" className="input" name="title" placeholder="Title" />
        <select name="project">
          {projects
            .toSorted((a, b) => a.title.localeCompare(b.title))
            .map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
        </select>
        <button className="btn btn-primary">Create</button>
      </form>
      {/* <div className="collapse bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-1" defaultChecked />
        <div className="collapse-title font-semibold">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>
      <div className="collapse bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="collapse bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div> */}
    </div>
  );
}
