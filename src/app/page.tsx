import Link from "next/link";

export default function Home() {
  return (
    <div className="m-10 container-xl">
      <p className="inline-block mr-2">Hello, go</p>
      <Link className="inline-block underline"href="/admin">/admin</Link>
    </div>
  );
}
