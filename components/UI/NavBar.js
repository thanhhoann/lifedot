import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { currentPointState } from "../../atoms";

export default function NavBar() {
  const points = useRecoilValue(currentPointState);

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

        <div>
          <h1>
            You have : <span style={{ fontStyle: "bold" }}>{points}</span>{" "}
            points
          </h1>
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
