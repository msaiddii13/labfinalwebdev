import prisma from "@/repos/prisma";
import { getProjects } from "./actions";
import Task from "@/app/task";
import { Circle, CircleCheck } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function Home() {
  async function createProject(formData) {
    "use server";

    try {
      await prisma.project.create({
        data: {
          title: formData.get("title"),
        },
      });

      revalidatePath("/");
    } catch (e) {
      console.error(e.message);
    }
  }

  async function createTask(formData) {
    "use server";

    try {
      await prisma.task.create({
        data: {
          title: formData.get("title"),
          project: formData.get("project"),
        },
      });

      revalidatePath("/");
    } catch (e) {
      console.error(e.message);
    }
  }

  const projects = await prisma.project.findMany({
    include: {
      tasks: {
        select: {
          id: true,
        },
      },
      // tasks: true
    },
  });
  // const projects = await getProjects();

  // console.log(
  //   await prisma.task.groupBy({
  //     by: ["completed"],
  //   }),
  // );

  // console.log(
  //   await prisma.task.aggregate({
  //     _count: { completed: true },
  //     where: {
  //       completed: true,
  //     },
  //   }),
  // );

  // console.log(
  //   await prisma.task.aggregate({
  //     _count: { completed: true },
  //     where: {
  //       completed: false,
  //     },
  //   }),
  // );

  // console.log(
  //   await prisma.task.groupBy({
  //     by: ["completed"],
  //     _count: { completed: true },
  //   }),
  // );

  // console.log(
  //   await prisma.task.groupBy({
  //     by: ["project"],
  //     _count: { id: true },
  //   }),
  // );

  console.log();

  async function callback() {
    "use server";
    revalidatePath("/");
  }

  // projects.length
  // projects.reduce( project.tasks.length)
  // projects.reduce( project.tasks.filter task.completed )
  return (
    <div className="m-4">
      <header className="flex gap-2">
        <span>{await prisma.project.count()}</span>
        <span>{await prisma.task.count()}</span>
        <span>
          {
            (
              await prisma.task.aggregate({
                _count: { id: true },
                where: {
                  completed: true,
                },
              })
            )._count.id
          }
        </span>
      </header>
      <ul className="grid gap-2">
        {projects.map(async (project) => (
          <li className="border rounded p-2" key={project.id}>
            <div className="flex justify-between">
              <span className="mb-2">{project.title}</span>
              <div className="flex gap-2">
                <span>
                  {/* {
                    (
                      await prisma.task.aggregate({
                        _count: { id: true },
                        where: {
                          project: project.id,
                        },
                      })
                    )._count.id
                  } */}
                  {project.tasks.length}
                </span>
                <button className="btn btn-circle btn-xs">
                  {project.completed ? (
                    <CircleCheck size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>
              </div>
            </div>
            <ul className="grid gap-1 text-sm">
              {project.tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  promise={prisma.task.findUnique({
                    where: {
                      id: task.id,
                    },
                  })}
                  callback={callback}
                />
              ))}
            </ul>
            <form
              action={createTask}
              className="m-2 flex justify-between gap-2"
            >
              <input
                name="title"
                type="text"
                className="input input-xs"
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="project"
                hidden
                readOnly
                value={project.id}
              />
              <button className="btn btn-xs">Create</button>
            </form>
          </li>
        ))}
      </ul>
      <form action={createProject} className="m-2 flex justify-between gap-2">
        <input
          name="title"
          type="text"
          className="input input-xs"
          placeholder="Title"
          required
        />
        <button className="btn btn-xs">Create</button>
      </form>
    </div>
  );
}
