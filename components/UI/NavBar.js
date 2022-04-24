import { Avatar } from "@nextui-org/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div className="nav">
        <div>
          <Link href="/">
            <h1 className="home__title link">life.</h1>
          </Link>
        </div>
        <div className="nav__links">
          <div>
            <Link href="/posts">
              <h2 className="posts__link link">Posts</h2>
            </Link>
          </div>

          <div>
            <Link href="/challenges">
              <h2 className="challenges__link link">Challenges</h2>
            </Link>
          </div>
        </div>

        <Link href="/profile">
          <Avatar
            pointer="true"
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            color="primary"
            bordered
            squared
          />
        </Link>
      </div>
    </>
  );
}
