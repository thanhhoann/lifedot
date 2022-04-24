import PostInput from "../components/Post/PostInput";
import { useEffect, useState } from "react";
import Layout from "../components/UI/Layout";
import NavBar from "../components/UI/NavBar";
import Link from "next/link";

export default function Home({ data_posts, data_challenges }) {
  const [posts, setPost] = useState([]);
  const [challenges, setChallenge] = useState([]);

  useEffect(() => {
    const loadedPosts = [];
    for (const key in data_posts) {
      loadedPosts.push({
        content: data_posts[key].content,
        id: data_posts[key].id,
        time: data_posts[key].time,
      });
    }
    while (loadedPosts.length > 2) loadedPosts.length--;
    setPost(loadedPosts);

    const loadedChallenges = [];
    for (const key in data_challenges) {
      loadedChallenges.push({
        content: data_challenges[key].content,
        id: data_challenges[key].id,
        time: data_challenges[key].time,
        tag: data_challenges[key].tag,
        points: data_challenges[key].points,
      });
      setChallenge(loadedChallenges);
    }
  }, []);

  return (
    <>
      <Layout>
        <NavBar />

        <div>
          <h1 className="title">POSTS</h1>
          <div className="posts__home">
            {posts.map((post, index) => (
              <div className="post" key={index}>
                <h1>{post.content}</h1>
                <h2 className="time">
                  {post.time.day}/{post.time.month}/{post.time.year} at{" "}
                  {post.time.hour}:{post.time.minute}
                </h2>
              </div>
            ))}
          </div>
          <div className="link__container">
            <Link href="/posts">
              <div className="link">
                <h1>See more</h1>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="title">CHALLLENGES</h1>
          <div className="challenges">
            {challenges.map((challenge, index) => (
              <div className="challenge" key={index}>
                <div>
                  <h1 className="content">{challenge.content}</h1>
                  <h2 className="tag">{challenge.tag}</h2>
                  <h2 className="time">
                    {challenge.time.day}/{challenge.time.month}/
                    {challenge.time.year} at {challenge.time.hour}:
                    {challenge.time.minute}
                  </h2>
                </div>
                <div className="points">+ {challenge.points} points</div>
                <div className="cta">DO</div>
              </div>
            ))}
          </div>
          <div className="link__container">
            <Link href="/challenges">
              <div className="link">
                <h1>See more</h1>
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res_posts = await fetch(
    "https://lifedot-65872-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
  );
  const res_challenges = await fetch(
    "https://lifedot-65872-default-rtdb.asia-southeast1.firebasedatabase.app/challenges.json"
  );

  const data_posts = await res_posts.json();
  const data_challenges = await res_challenges.json();

  return {
    props: {
      data_posts,
      data_challenges,
    },
  };
}
