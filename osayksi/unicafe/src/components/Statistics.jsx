import StatisticLine from './StatisticLine';

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all ? ((good - bad) / all).toFixed(4): 0;
  const positive = all ? ((good / all) * 100).toFixed(4) : 0;

  return (
    <section>
      {all ? (
        <>      
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="All" value={all}/>
          <StatisticLine text="Average" value={average}/>
          <StatisticLine text="Positive" value={positive}/>      
        </>
      ) : (<p>No feedback given</p>)}
    </section>
  )
};

export default Statistics