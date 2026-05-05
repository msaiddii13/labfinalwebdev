import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";
import Task from "@/app/task";

export default async function Home() {
  const projects = await prisma.project.findMany({
    include: {
      tasks: {
        select: {
          id: true,
        },
      },
    },
  });

  console.log(
    (
      await prisma.task.aggregate({
        _count: { id: true },
        where: {
          completed: true,
        },
      })
    )._count.id,
  );

  console.log(
    await prisma.task.groupBy({
      by: ["completed"],
      _count: { completed: true },
    }),
  );

  async function createProject(formData) {
    "use server";

    try {
      await prisma.project.create({
        data: {
          title: formData.get("title"),
        },
      });
      revalidatePath("/");
      // return whatever;
    } catch (e) {
      console.error(e.message);
    }
  }

  async function createTask(formData) {
    "use server";

    console.log(formData.get("project"));

    try {
      await prisma.task.create({
        data: {
          title: formData.get("title"),
          project: formData.get("project"),
        },
      });
      revalidatePath("/");
      // return whatever;
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="m-4">
      <header className="flex gap-2 mb-2">
        {/* <span>{projects.length}</span> */}
        {/* <span>
          {projects.reduce((total, project) => project.tasks.length + total, 0)}
        </span> */}
        <span>{await prisma.project.count()}</span>
        <span>{await prisma.task.count()}</span>
        <span>
          {
            (
              await prisma.task.aggregate({
                _count: { id: true },
                where: {
                  completed: false,
                },
              })
            )._count.id
          }
        </span>
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
        {(
          await prisma.task.groupBy({
            by: ["completed"],
            _count: { completed: true },
          })
        ).map((metric) => (
          <span key={metric.completed}>{metric._count.completed}</span>
        ))}
      </header>
      <ul className="grid gap-2">
        {projects.map((project) => (
          <li className="border rounded p-2" key={project.id}>
            <span className="mb-1">{project.title}</span>
            <ul className="text-sm grid gap-0.5">
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
      <form className="flex gap-2 justify-between mt-3" action={createProject}>
        <input
          name="title"
          type="text"
          className="input input-sm"
          placeholder="Title"
        />
        <button className="btn btn-sm">Create</button>
      </form>
      <form className="flex gap-2 justify-between mt-3" action={createTask}>
        <input
          name="title"
          type="text"
          className="input input-sm"
          placeholder="Title"
        />
        <select className="select select-sm" name="project">
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
        <button className="btn btn-sm">Create</button>
      </form>
    </div>
  );
}
