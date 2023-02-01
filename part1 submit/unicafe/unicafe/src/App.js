import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Stat = ({
  good,
  neutral,
  bad,
  positiveFeed,
  totaly,
  average,
  total,
  hasFeedback,
}) => {
  return (
    <div>
      <h4>statistics</h4>
      {hasFeedback ? (
        <div>
          {/* 2way prefer the second one but for the ex= */}
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='total' value={total(good, bad, neutral)} />
          <StatisticLine text='average' value={average(good, bad, totaly)} />
          <StatisticLine text='positive' value={positiveFeed(good, totaly)} />
          {/* <p>good {good}</p>
          <p> neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>total {total(good, bad, neutral)}</p>
          <p>average {average(good, bad, totaly)}</p>
          <p>positive Feedback {positiveFeed(good, totaly)}</p> */}
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totaly, setTotaly] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);

  const handleClickReview = (a, i) => {
    a(i + 1);
    setHasFeedback(true);
    console.log(i);
  };

  const total = (a, b, c) => {
    setTotaly(a + b + c);
    return totaly;
  };

  const average = (a, c, total) => {
    if (a || c > 0) {
      return (a - c) / total;
    }
  };
  const positiveFeed = (a, total) => {
    //  to prevent the NaN
    if (a > 0) {
      return (a / total) * 100;
    }
  };
  console.log(totaly);

  return (
    <div>
      <h4>give feedback</h4>
      <div>
        <Button
          handleClick={() => handleClickReview(setGood, good)}
          text='good'
        />
        <Button
          handleClick={() => handleClickReview(setNeutral, neutral)}
          text='neutral'
        />

        <Button handleClick={() => handleClickReview(setBad, bad)} text='bad' />
      </div>
      <Stat
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        positiveFeed={positiveFeed}
        total={total}
        totaly={totaly}
        hasFeedback={hasFeedback}
      />
    </div>
  );
};

export default App;
