import { useState } from "react";
import Layout from "../components/UI/Layout";
import NavBar from "../components/UI/NavBar";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { DateTime } from "luxon";

export default function Posts() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPost] = useState([]);

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
  };
  return (
    <>
      <Layout>
        <NavBar />
        <div className="form">
          <h1 className="form-title">What's your wish today ?</h1>

          <form className="form-input" onSubmit={submitHandler}>
            <Input
              autoFocus
              type="text"
              value={postContent}
              bordered="true"
              size="xl"
              width="50vw"
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
      </Layout>
    </>
  );
}
