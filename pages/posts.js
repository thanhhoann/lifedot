import { useState, useEffect } from "react";
import Layout from "../components/UI/Layout";
import NavBar from "../components/UI/NavBar";
import axios from "axios";
import { Input, Button, Textarea } from "@nextui-org/react";
import { DateTime } from "luxon";
import Router from "next/router";

export default function Posts({ data_posts }) {
  const [postContent, setPostContent] = useState("");
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const loadedPosts = [];
    for (const key in data_posts) {
      loadedPosts.push({
        content: data_posts[key].content,
        id: data_posts[key].id,
        time: data_posts[key].time,
      });
    }
    setPost(loadedPosts);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const respond = await fetch(
      "https://lifedot-65872-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
      {
        method: "POST",
        body: JSON.stringify({
          content: postContent,
          id: Math.random() * 0.2,
          time: DateTime.now().toObject(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawData = await respond.json();
    console.log(rawData);
    setPostContent("");
    Router.reload(window.location.pathname);
  };
  return (
    <>
      <Layout>
        <NavBar />
        <div className="form">
          <h1 className="form-title">Whats on your mind ?</h1>
          <form className="form-input" onSubmit={submitHandler}>
            <Textarea
              bordered
              color="black"
              size="xl"
              width="50vw"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            <div className="btns">
              <Button
                name="posts"
                className="btn"
                type="submit"
                color="primary"
                auto
                bordered
                ghost
              >
                Add to Posts
              </Button>
            </div>
          </form>
        </div>

        <div>
          <div className="posts">
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
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res_posts = await fetch(
    "https://lifedot-65872-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
  );

  const data_posts = await res_posts.json();

  return {
    props: {
      data_posts,
    },
  };
}
