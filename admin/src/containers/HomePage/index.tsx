/**
 *
 * HomePage
 *
 */

import { pluginId } from "@/utils";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        maxWidth: "24rem",
        margin: "1rem auto",
        padding: "2rem 4rem",
      }}
    >
      <h1 style={{ fontSize: "1.25rem" }}>{pluginId}&apos;s HomePage</h1>
      <p>It is just what it is...</p>
    </div>
  );
};

export default HomePage;
