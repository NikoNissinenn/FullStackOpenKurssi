 const StatisticLine = ({text, value}) => {
  return (
    <p>{`${text} ${value}`} {text==="Positive" ? "%" : ""}</p>
  )
 };

 export default StatisticLine;