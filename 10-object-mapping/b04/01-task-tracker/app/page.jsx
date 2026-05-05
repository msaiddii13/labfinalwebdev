import * as users from "@/repos/users";
import Karma from "@/app/karma";

export default async function Home({ params, searchParams }) {
  const { action, user } = await searchParams;

  if (action === "karma" && user) {
    await users.karma(user);
  }

  const data = await users.read();

  return (
    <ul className="flex flex-col gap-2 m-2">
      {data.map((user) => (
        <li key={user.id} className="border rounded p-2">
          <div className="mb-2">
            <div>{user.email}</div>
            <div>{user.name}</div>
            <Karma user={user} rand={Math.random()} />
          </div>
          {user.posts.length !== 0 && (
            <ul className="border-t">
              {user.posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
