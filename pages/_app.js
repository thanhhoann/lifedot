import "../styles/globals.css";
import "../styles/Home.scss";
import "../styles/layout.scss";
import "../styles/post.scss";

import "../utils/reset.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
