import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { DateTime } from "luxon";

export default function PostInput({ getContent }) {
  const [challengeContent, setChallengeContent] = useState("");
  const [challenges, setChallenges] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    getContent({
      content: postContent,
      id: Math.random() * 0.2,
      time: DateTime.now().toObject(),
    });
    setPostContent("");
  };

  return (
    <>
      <div>
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
            <Button
              name="challenges"
              className="btn"
              type="submit"
              color="secondary"
              auto
              bordered
              ghost
            >
              Add to Challenges
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
