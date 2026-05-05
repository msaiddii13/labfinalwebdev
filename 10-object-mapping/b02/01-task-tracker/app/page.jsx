import Likes from "@/app/likes";
import * as users from "@/repos/users";

export default async function Home({ params, searchParams }) {
  const { action, id } = await searchParams;
  if (action === "like") {
    try {
      await users.like(id);
    } catch (e) {
      console.error(e);
    }
  }

  const data = await users.read();
  return (
    <ul className="border rounded p-4">
      {data.map((user) => (
        <li className="border rounded p-2 m-2" key={user.id}>
          <div className="flex gap-2">
            <span>Name: {user.name}</span> <span>Email: {user.email}</span>
            <Likes user={user} />
          </div>
          <ul>
            {user.posts?.map((post) => (
              <li key={post.id}>Title: {post.title}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
