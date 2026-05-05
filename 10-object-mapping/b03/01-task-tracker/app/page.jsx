import Karma from "@/app/karma";
import * as users from "@/repos/users";

export default async function Home({ params, searchParams }) {
  const { action, user } = await searchParams;

  if (action === "karma" && user) {
    await users.karma(user);
  }

  const data = await users.read();

  return (
    <ul className="m-4">
      {data.map((user) => (
        <li key={user.id} className="border rounded p-1 m-2">
          <div className="flex gap-2 justify-between">
            Email: {user.email}
            {user.name && <span>Name: {user.name}</span>}
            <Karma user={user} value={Math.random()} />
          </div>
          {user.posts.length !== 0 && (
            <ul>
              {user.posts.map((post) => (
                <li key={post.id}>Title: {post.title}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
