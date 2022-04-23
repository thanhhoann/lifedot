import { useState } from "react";
import Layout from "../components/UI/Layout";
import NavBar from "../components/UI/NavBar";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { DateTime } from "luxon";

export default function challenges() {
  const [challengeContent, setChallengeContent] = useState("");
  const [challenges, setChallenge] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const respond = await fetch(
      "https://lifedot-65872-default-rtdb.asia-southeast1.firebasedatabase.app/challenges.json",
      {
        method: "POST",
        body: JSON.stringify({
          content: challengeContent,
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

    setChallengeContent("");
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
              value={challengeContent}
              bordered="true"
              size="xl"
              width="50vw"
              onChange={(e) => setChallengeContent(e.target.value)}
            />

            <div className="btns">
              <Button
                name="challenges"
                className="btn"
                type="submit"
                color="primary"
                auto
                bordered
                ghost
              >
                Add to challenges
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
