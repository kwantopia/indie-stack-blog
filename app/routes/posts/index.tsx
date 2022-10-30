import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "app/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as unknown as LoaderData;
  // console.log(posts);

  return (
    <main>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <div>&nbsp;</div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-red-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
