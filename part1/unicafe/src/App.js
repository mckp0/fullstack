import { useState } from 'react'


const Header = ({ text }) => (
    <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.allClicks} />
        <StatisticLine text="average" value={(props.good-props.bad)/props.allClicks} />
        <StatisticLine text="positive" value={props.good*100/props.allClicks+"%"} />
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const handleGood = () => {
    console.log("good +1")
    setGood(good + 1)
    setAllClicks(allClicks + 1)
  }

  const handleNeutral = () => {
    console.log("neutral +1")
    setNeutral(neutral + 1)
    setAllClicks(allClicks + 1)
  }

  const handleBad = () => {
    console.log("bad +1")
    setBad(bad + 1)
    setAllClicks(allClicks + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks} />


    </div>
  )
}

export default App