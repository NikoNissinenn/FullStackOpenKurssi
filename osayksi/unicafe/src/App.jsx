import { useState } from 'react'
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        value={good}
        setValue={setGood}
        text="Good"
      />
      <Button 
        value={neutral}
        setValue={setNeutral}
        text="Neutral"
      />
      <Button 
        value={bad}
        setValue={setBad}
        text="Bad"
      />

      <h2>Statistics</h2>
      
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App