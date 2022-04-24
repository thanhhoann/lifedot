import "../styles/globals.css";
import "../styles/Home.scss";
import "../styles/layout.scss";
import "../styles/post.scss";
import "../styles/challenges.scss";

import "../utils/reset.css";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
