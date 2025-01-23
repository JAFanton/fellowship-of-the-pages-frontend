import React from "react";
import "./about.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">Competition Rules</h1>
      <h2 className="about-us-intro">
        Here are the rules that will guide the competition:
      </h2>
      <ol className="rules-list">
        <li>
          One point is given for completing both a fiction and non-fiction book. A “classic” novel can be used instead of a non-fiction book. Most points wins.
        </li>
        <li>
          The winner gets a fancy <em>Lord of the Rings</em> book box set from the loser.
        </li>
        <li>
          Rules can be introduced or removed throughout the process if both parties agree.
        </li>
        <li>
          Unless both parties agree on an exception, the book has to be at least 45,000 words long. For example, <em>Animal Farm</em> (30,000 words).
        </li>
        <li>
          If both parties agree, a book over 300,000 words can be counted as two books. For example, a <em>Game of Thrones</em> book.
        </li>
        <li>
          Kindle, audiobooks, and e-books are all allowed.
        </li>
        <li>
          A log of each book read must be posted on the website as proof that the book has been finished. This will also include a 2 - 4 sentence summary of the book.
        </li>
        <li>
          The competition starts and finishes on the 5th of January.
        </li>
        <li>
          Each player receives a handicap for this challenge:
          <ul className="sub-rules">
            <li>Justin: No money to buy books.</li>
            <li>Dom: Dyslexic and has the reading speed of a "retarded donkey".</li>
          </ul>
        </li>
        <li>
          You can re-read books you’ve completed before the challenge and finish books you’ve started (within reason).
        </li>
      </ol>
    </div>
  );
};

export default AboutUs;