import { useState, useEffect } from "react";
import Layout from "../components/UI/Layout";
import NavBar from "../components/UI/NavBar";
import axios from "axios";
import { Input, Button, Textarea } from "@nextui-org/react";
import { DateTime } from "luxon";
import { Router } from "next/router";

export default function Challenges({ data_challenges }) {
  const [challengeContent, setChallengeContent] = useState("");
  const [challenges, setChallenge] = useState([]);

  const [tag, setTag] = useState("");
  const [points, setPoints] = useState("");

  useEffect(() => {
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
          tag: tag,
          points: points,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawData = await respond.json();
    console.log(rawData);

    setChallengeContent("");
    setTag("");
    setPoints("");
    Router.reload(window.location.pathname);
  };

  return (
    <>
      <Layout>
        <NavBar />
        <div className="form">
          <h1 className="form-title">Give a challenge to someone</h1>

          <form className="form-input" onSubmit={submitHandler}>
            <Textarea
              bordered
              color="black"
              size="xl"
              width="50vw"
              value={challengeContent}
              onChange={(e) => setChallengeContent(e.target.value)}
            />

            <div className="form-input__sub">
              <h1 className="form-title">What's your profession ?</h1>
              <Input
                autoFocus
                type="text"
                value={tag}
                bordered="true"
                size="xl"
                width="50vw"
                onChange={(e) => setTag(e.target.value)}
              />
            </div>

            <div className="form-input__sub">
              <h1 className="form-title">and how many points for that ?</h1>
              <Input
                autoFocus
                type="number"
                value={points}
                bordered="true"
                size="xl"
                width="50vw"
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>

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
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res_challenges = await fetch(
    "https://lifedot-65872-default-rtdb.asia-southeast1.firebasedatabase.app/challenges.json"
  );

  const data_challenges = await res_challenges.json();

  return {
    props: {
      data_challenges,
    },
  };
}
