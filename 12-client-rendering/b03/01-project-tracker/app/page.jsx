import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";
import Task from "@/app/task";

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
      console.error(e);
    }
  }

  async function callback() {
    "use server";

    // update data
  }

  const projects = await prisma.project.findMany({
    include: {
      tasks: {
        select: {
          id: true,
        },
      },
      // tasks: true,
    },
  });

  console.log(projects);

  // const result = await prisma.task.aggregate({
  //   _count: { id: true },
  //   where: {
  //     completed: true,
  //   },
  // });
  // console.log(result._count.id);

  const completedGroups = await prisma.task.groupBy({
    by: ["completed"],
    _count: { completed: true },
  });
  const completedTasksPerProjects = await prisma.task.groupBy({
    by: ["project"],
    _count: { completed: true },
  });

  // console.log(completedGroups);
  // console.log(completedTasksPerProjects);

  return (
    <div className="m-4">
      <header className="flex gap-2 font-semibold text-sm mb-2">
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
        {/* <span>{projects.length}</span> */}
        {/* <span>{projects.reduce((total, project) => project.tasks.length + total, 0)}</span> */}
      </header>
      <ul className="grid gap-2">
        {projects.map((project) => (
          <li className="rounded border p-2" key={project.id}>
            <div className="flex gap-2 mb-1 justify-between">
              <span>{project.title}</span>
              {/* <span>
                {
                  completedTasksPerProjects.find(
                    (item) => item.project === project.id,
                  )._count.completed
                }
              </span> */}
            </div>
            <ul className="text-sm grid gap-0.5">
              {project.tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  promise={prisma.task.findUnique({ where: { id: task.id } })}
                  callback={callback}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <form className="flex gap-2 justify-between mt-4" action={createProject}>
        <input
          type="text"
          className="input input-sm"
          name="title"
          placeholder="Title"
        />
        <button className="btn btn-sm">Create</button>
      </form>
    </div>
  );
}
